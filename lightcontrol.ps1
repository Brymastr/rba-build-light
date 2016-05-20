param([String]$color = "green")

function allOff() {
	&{.\USBCMDAP V 0 0 101 20 7 0}
	&{.\USBCMDAP V 0 0 101 12 0 7}
}

function flameOn() {
	&{.\USBCMDAP V 0 0 101 12 2 0}
}

function greenOn() {
	&{.\USBCMDAP V 0 0 101 12 1 0}
}

allOff
if($color -eq "green") {
	greenOn
} else {
	flameOn
}