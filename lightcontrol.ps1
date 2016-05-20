param([String]$color="green")

# #:: VARIABLES
# $doc = New-Object System.Xml.XmlDocument
# $result=1

# ###PUT JOBS IN HERE
# $jobs = @(
# 	# "ASU.Build",
# 	# "ASU.PDQDeploy",
# 	"IntegrationService.Build",
# 	"IntegrationService.PDQDeploy",
# 	"Salesite.ALLINONE13.Installer",
# 	"Salesite.Net.ProformaInvoice.Build",
# 	"Salesite.Net.SSCDM.Build",
# 	"Salesite.VB6.Build")

function allOff(){
	if ($debug){Write-host "allOff"}else{
		&{.\USBCMDAP V 0 0 101 20 7 0}
		&{.\USBCMDAP V 0 0 101 12 0 7}
	}
}
function redOn() {
	if ($debug){write-host "Red"}else{
		&{.\USBCMDAP V 0 0 101 12 2 0}
	}
}
function greenOn(){
	if ($debug){write-host "Green"}else{
		&{.\USBCMDAP V 0 0 101 12 1 0}
	}
}

allOff
if($color -eq "green") {
	greenOn
} else {
	redOn
}

# #:: MAIN
# Set-Location "C:\USBLight"
# Start-Transcript -Path ".\redLighGreenLight.log" -Append -Force;
# Write-host "The Date $(Get-Date -format 'u')"

# allOff
# blinkBlue
# foreach ($jobName in $jobs) {
# 	$doc.Load("https://dc1vplbld01.rbauction.net/jenkins/job/${jobName}/lastBuild/api/xml")
# 	$buildResult = $doc.freeStyleBuild.result
# 	$buildNumber = $doc.freeStyleBuild.number
# 	if ($buildResult -ne "SUCCESS"){
# 		$result=0
# 	}
# 	Write-Host $jobName $buildNumber $buildResult $result "`r`n"
# }

# if (-Not (testTimedBoomi)) {
# 	$result=0
# }

# allOff
# if ($result){
# 	greenOn
# }
# else {
# 	redOn
# }
