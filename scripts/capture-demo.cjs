const { chromium } = require(process.env.OLBOL_RUNTIME_MODULES + '/playwright');
const fs = require('node:fs');
const path = require('node:path');
async function main() {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const report = [];
  const folder = path.resolve(process.env.OLBOL_CAPTURE_DIR || 'docs/capturas');
  fs.mkdirSync(folder, { recursive: true });
  for (const [name, route] of [['inicio','/'],['catalogo','/vehiculos'],['vehiculo','/vehiculos/terra-s5'],['asesor','/asesor'],['comparar','/comparar'],['propuesta','/demo'],['crm','/crm']]) {
    const errors = [];
    const listener = e => errors.push(e.message);
    page.on('pageerror', listener);
    await page.goto('http://localhost:3000' + route, { waitUntil: 'domcontentloaded', timeout: 180000 });
    await page.locator('html[data-experience-ready="true"]').waitFor({timeout:120000});
    if(name==='crm') await page.locator('.crm-board').waitFor({timeout:60000});
    if(name==='asesor') await page.locator('.message').first().waitFor({timeout:60000});
    await page.evaluate(()=>document.querySelectorAll('img').forEach(img=>img.loading='eager'));
    await page.waitForFunction(() => [...document.querySelectorAll('img')].filter(i=>i.loading!=='lazy').every(i=>i.complete), null, {timeout:90000});
    await page.evaluate(()=>scrollTo({top:0,left:0,behavior:'instant'}));
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    await page.waitForFunction(() => [...document.querySelectorAll('img')].every(i=>i.complete), null, {timeout:90000});
    await page.screenshot({ path: path.join(folder, name + '.png'), fullPage: true });
    await page.screenshot({ path: path.join(folder, name + '-escena.png') });
    report.push({ name, width:1440, errors, ...(await page.evaluate(() => ({ overflow:document.documentElement.scrollWidth > innerWidth, brokenImages:[...document.querySelectorAll('img')].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src), emptyVehicleImages:[...document.querySelectorAll('.vehicle-visual')].filter(i=>i.getBoundingClientRect().height<10).length }))) });
    page.off('pageerror', listener);
  }
  for (const width of [390,768,1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [name,route] of [['inicio','/'],['catalogo','/vehiculos'],['vehiculo','/vehiculos/terra-s5'],['asesor','/asesor'],['comparar','/comparar'],['propuesta','/demo'],['crm','/crm']]) {
      await page.goto('http://localhost:3000'+route,{waitUntil:'domcontentloaded',timeout:180000});
      await page.locator('html[data-experience-ready="true"]').waitFor({timeout:120000});
      if(name==='crm') await page.locator('.crm-board').waitFor({timeout:60000});
      if(name==='asesor') await page.locator('.message').first().waitFor({timeout:60000});
      await page.evaluate(()=>document.querySelectorAll('img').forEach(img=>img.loading='eager'));
      await page.evaluate(()=>scrollTo({top:0,left:0,behavior:'instant'}));
      await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
      await page.waitForFunction(() => [...document.querySelectorAll('img')].every(i=>i.complete), null, {timeout:90000});
      if(width===390) await page.screenshot({path:path.join(folder,name+'-movil.png'),fullPage:true});
      report.push({name,width,...(await page.evaluate(()=>{
        const gallery=document.querySelector('.vehicle-gallery');
        const content=document.querySelector('.detail-hero__content');
        const badge=document.querySelector('.vehicle-gallery__badge');
        return {overflow:document.documentElement.scrollWidth>innerWidth,overflowElements:[...document.querySelectorAll('main *')].filter(e=>e instanceof HTMLElement && e.getBoundingClientRect().right>innerWidth+1).slice(0,8).map(e=>e.className),galleryOverlap:!!(gallery&&content&&innerWidth<=900&&gallery.getBoundingClientRect().bottom>content.getBoundingClientRect().top),stretchedGalleryBadge:!!(badge&&badge.getBoundingClientRect().height>60)};
      }))});
    }
  }
  fs.writeFileSync(path.join(folder,'revision.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report));
  await browser.close();
}
main().catch(error=>{ console.error(error);process.exit(1); });
