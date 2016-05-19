
#:: VARIABLES
$doc = New-Object System.Xml.XmlDocument
$result=1

###PUT JOBS IN HERE
$jobs = @(
	# "ASU.Build",
	# "ASU.PDQDeploy",
	"IntegrationService.Build",
	"IntegrationService.PDQDeploy",
	"Salesite.ALLINONE13.Installer",
	"Salesite.Net.ProformaInvoice.Build",
	"Salesite.Net.SSCDM.Build",
	"Salesite.VB6.Build")
#$jobs = @("DEI3.Build.Tablet","DEI3.Build-Dispatcher","DEI3.Build.DbMigrations","DEI3.Build.Exporter.Installer","DEI3.Build.Gateway","DEI3.Build.Mobile","DEI3.Build.Uploader","DEI3.Build.Web","DEI3.Build.WebService","DEI3.Deploy.PDQDeployPackage")

$debug=0
#:: FUNCTIONS
function allOff(){
	if ($debug){Write-host "allOff"}else{
		&{.\USBCMDAP V 0 0 101 20 7 0}
		&{.\USBCMDAP V 0 0 101 12 0 7}
	}
}
function blinkBlue() {
	if ($debug){write-host "Blink"}else{
		&{.\USBCMDAP V 0 0 101 12 4 0} 
		&{.\USBCMDAP V 0 0 101 20 0 4}
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

function testTimedBoomi(){

	$timeout=20000
	$boomiResult = 1
	# PROJTEST
	$BOOMI_URL="https://cc1.sfdctest.rbaenv.com:9443/projTEST/ws/simple/getReceipts?saleNumbers=2015155,2015101,2016394,2015244,2016371,2016365"
	$base64="cHJvalRFU1RAcml0Y2hpZWJyb3NhdWN0aW9uZWVycy1aMzZLWTc6NjEyMzc2NWYtM2ZkMy00ODJiLWE3M2MtNzk5N2IwMGNkMjk4"

	# DEV
	# $BOOMI_URL="https://cc1.sfdctest.rbaenv.com:9443/projDEV/ws/simple/getReceipts?saleNumbers=2015142,2014319"
	# $base64="cHJvakRFVkByaXRjaGllYnJvc2F1Y3Rpb25lZXJzLVozNktZNzoyMmM3ZjU0OS1hMTk5LTRkYjAtOWFhNi0yNTFiNWZjZTNkMjI="

	$HTTP_Request = [System.Net.WebRequest]::Create($BOOMI_URL)
	$HTTP_Request.Headers.add("AUTHORIZATION","Basic $base64")
	$HTTP_Request.Timeout=$timeout
	
	write-host "Query Boomi:$BOOMI_URL Timeout:$timeout ms"
	try{
		$HTTP_Response = $HTTP_Request.GetResponse()
		$HTTP_Status = [int]$HTTP_Response.StatusCode
		$HTTP_Value = $HTTP_Response.Value
		write-host S $HTTP_Status V $HTTP_Value
		if (-Not $HTTP_Value){
			Write-host "There is no data to return. Is Djuro stuck in the toilet again?"
		}
	}
	Catch {
		$ErrorMessage = $_.Exception.Message
		$FailedItem = $_.Exception.ItemName
		Write-host ERROR: $ErrorMessage $FailedItem
		$boomiResult=0
	}
	Finally {
		if ($HTTP_Response){
			$HTTP_Response.Close()
		}
	}
	Write-host "testTimedBoomi Result: $boomiResult"
	return $boomiResult
}


#:: MAIN
Set-Location "C:\USBLight"
Start-Transcript -Path ".\redLighGreenLight.log" -Append -Force;
Write-host "The Date $(Get-Date -format 'u')"

allOff
blinkBlue
foreach ($jobName in $jobs) {
	$doc.Load("https://dc1vplbld01.rbauction.net/jenkins/job/${jobName}/lastBuild/api/xml")
	$buildResult = $doc.freeStyleBuild.result
	$buildNumber = $doc.freeStyleBuild.number
	if ($buildResult -ne "SUCCESS"){
		$result=0
	}
	Write-Host $jobName $buildNumber $buildResult $result "`r`n"
}

if (-Not (testTimedBoomi)) {
	$result=0
}

allOff
if ($result){
	greenOn
}
else {
	redOn
}

Stop-Transcript;
