param(
  [string]$DocumentPath,
  [string]$OutputDirectory
)
$ErrorActionPreference = 'Stop'
$taskRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$docPath = if ($DocumentPath) { (Resolve-Path -LiteralPath $DocumentPath).Path } else { Join-Path $taskRoot 'docs\OLBOL WhatsApp IA y Yaku.docx' }
$qaPath = if ($OutputDirectory) { [System.IO.Path]::GetFullPath($OutputDirectory) } else { Join-Path $taskRoot 'docs\qa-whatsapp' }
New-Item -ItemType Directory -Force -Path $qaPath | Out-Null
$pdfPath = Join-Path $qaPath 'OLBOL revision.pdf'
$wordInstance = New-Object -ComObject Word.Application
$wordInstance.Visible = $false
$wordInstance.DisplayAlerts = 0
try {
  $openedDoc = $wordInstance.Documents.Open($docPath, $false, $true)
  $openedDoc.ExportAsFixedFormat($pdfPath, 17)
  $openedDoc.Close($false)
} finally {
  $wordInstance.Quit()
  [System.Runtime.InteropServices.Marshal]::ReleaseComObject($wordInstance) | Out-Null
}
& 'C:\Users\LENOVO\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' (Join-Path $PSScriptRoot 'render-document-pages.py') $pdfPath $qaPath
