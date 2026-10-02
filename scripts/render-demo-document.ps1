$ErrorActionPreference = 'Stop'
$taskRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$docPath = Join-Path $taskRoot 'docs\OLBOL propuesta y guion de demo.docx'
$qaPath = Join-Path $taskRoot 'docs\qa-documento'
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
