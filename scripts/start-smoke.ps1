param(
  [Parameter(Mandatory = $true)][string]$RuntimeBin,
  [int]$Port = 3087,
  [string]$HomeDirectory
)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
if (-not $HomeDirectory) { $HomeDirectory = Join-Path $root 'output\smoke-home' }
$env:DSH_HOME = [System.IO.Path]::GetFullPath($HomeDirectory)
$env:DSH_TELEMETRY_MODE = 'DISABLED'
Set-Location $root
& node (Join-Path $PSScriptRoot 'prepare-smoke.mjs') $env:DSH_HOME
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
& node $RuntimeBin --profile side-chat-smoke --host 127.0.0.1 --port $Port --no-open
exit $LASTEXITCODE
