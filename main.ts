let speedFactor = 80
let pin_L = DigitalPin.P1
let pin_R = DigitalPin.P13
let whiteline = 1
let connected = 0
console.logValue("x", pins.digitalReadPin(DigitalPin.P13))
let strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
pins.setPull(pin_L, PinPullMode.PullNone)
pins.setPull(pin_R, PinPullMode.PullNone)
basic.showString("S")
// temporary code
// motor_run(100, 100); basic.pause(2000)
// motor_run(); basic.pause(300)
// motor_run(-100, -100, 60); basic.pause(2000)
// motor_run()
let autonomni = true
let turn = false
let rovne = true
let prava = false
let left = false
function motor_run(left: number = 0, right: number = 0, speed_factor: number = 80) {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, Math.map(Math.constrain(left * (speedFactor / 100), -100, 100), -100, 100, -255, 255))
    PCAmotor.MotorRun(PCAmotor.Motors.M4, Math.map(Math.constrain(-1 * right * (speedFactor / 100), -100, 100), -100, 100, -255, 255))
}

let ignore = false
let okoli = 1
let linie = 0
basic.forever(function on_forever() {
    
    let l = (whiteline ^ pins.digitalReadPin(pin_L)) == 0 ? false : true
    let r = (whiteline ^ pins.digitalReadPin(pin_R)) == 0 ? false : true
    if (autonomni) {
        if (rovne) {
            if (pins.digitalReadPin(DigitalPin.P13) == okoli && pins.digitalReadPin(DigitalPin.P1) == okoli) {
                motor_run(-140, -140)
                ignore = false
            } else if (pins.digitalReadPin(DigitalPin.P13) == linie && pins.digitalReadPin(DigitalPin.P1) == linie) {
                motor_run(-140, -140)
                ignore = true
            } else if (pins.digitalReadPin(DigitalPin.P13) == okoli && pins.digitalReadPin(DigitalPin.P1) == linie) {
                motor_run(-140, 100)
            } else if (pins.digitalReadPin(DigitalPin.P13) == linie && pins.digitalReadPin(DigitalPin.P1) == okoli) {
                motor_run(100, -140)
            }
            
            basic.pause(50)
        } else if (prava) {
            if (pins.digitalReadPin(DigitalPin.P13) == okoli && pins.digitalReadPin(DigitalPin.P1) == okoli) {
                motor_run(-140, 100)
            } else if (pins.digitalReadPin(DigitalPin.P13) == linie && pins.digitalReadPin(DigitalPin.P1) == linie) {
                motor_run(-140, 100)
            } else if (pins.digitalReadPin(DigitalPin.P13) == okoli && pins.digitalReadPin(DigitalPin.P1) == linie) {
                motor_run(-140, 100)
            } else if (pins.digitalReadPin(DigitalPin.P13) == linie && pins.digitalReadPin(DigitalPin.P1) == okoli) {
                motor_run(-140, -140)
            }
            
            basic.pause(50)
        } else if (left) {
            if (pins.digitalReadPin(DigitalPin.P13) == okoli && pins.digitalReadPin(DigitalPin.P1) == okoli) {
                motor_run(100, -140)
            } else if (pins.digitalReadPin(DigitalPin.P13) == linie && pins.digitalReadPin(DigitalPin.P1) == linie) {
                motor_run(100, -140)
            } else if (pins.digitalReadPin(DigitalPin.P13) == okoli && pins.digitalReadPin(DigitalPin.P1) == linie) {
                motor_run(-140, -140)
            } else if (pins.digitalReadPin(DigitalPin.P13) == linie && pins.digitalReadPin(DigitalPin.P1) == okoli) {
                motor_run(-140, -100)
            }
            
            basic.pause(50)
        } else if (turn) {
            
            if (pins.digitalReadPin(DigitalPin.P13) == okoli && pins.digitalReadPin(DigitalPin.P1) == okoli) {
                motor_run(-100, 100)
            } else if (pins.digitalReadPin(DigitalPin.P13) == okoli && pins.digitalReadPin(DigitalPin.P1) == linie) {
                turn = false
            }
            
        }
        
    }
    
})
