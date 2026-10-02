const {chromium}=require(process.env.OLBOL_RUNTIME_MODULES+'/playwright');
const fs=require('node:fs');
(async()=>{
  const browser=await chromium.launch({channel:'msedge',headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  await page.emulateMedia({reducedMotion:'reduce'});
  fs.mkdirSync('docs/qa-propuesta',{recursive:true});
  await page.goto('http://localhost:3000/demo',{waitUntil:'networkidle'});
  for(const width of [1440,390]){
    await page.setViewportSize({width,height:1000});
    for(const [name,selector] of [['canales','.channel-options'],['solucion','#solucion'],['condiciones','.answer-grid']]){
      await page.locator(selector).evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY-110,behavior:'instant'}));
      await page.screenshot({path:`docs/qa-propuesta/${name}-${width}.png`});
    }
  }
  await browser.close();
  console.log('Propuesta capturada en escritorio y móvil');
})().catch(e=>{console.error(e);process.exit(1)});
