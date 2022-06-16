speedFactor = 80
pin_L = DigitalPin.P1
pin_R = DigitalPin.P13
whiteline = 1
connected = 0
console.log_value("x", pins.digital_read_pin(DigitalPin.P13))
strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
pins.set_pull(pin_L, PinPullMode.PULL_NONE)
pins.set_pull(pin_R, PinPullMode.PULL_NONE)
basic.show_string("S")
#temporary code
#motor_run(100, 100); basic.pause(2000)
#motor_run(); basic.pause(300)
#motor_run(-100, -100, 60); basic.pause(2000)
#motor_run()
autonomni = True
turn = False
rovne = True
prava = False
left = False
def motor_run(left = 0, right = 0, speed_factor = 80):
    PCAmotor.motor_run(PCAmotor.Motors.M1, Math.map(Math.constrain(left * (speedFactor / 100), -100, 100), -100, 100, -255, 255))
    PCAmotor.motor_run(PCAmotor.Motors.M4, Math.map(Math.constrain(-1 * right * (speedFactor / 100), -100, 100), -100, 100, -255, 255))
ignore = False
okoli = 1
linie = 0
def on_forever():
    global ignore, linie, okoli, turn, rovne, left, prava
    l = False if (whiteline ^ pins.digital_read_pin(pin_L)) == 0 else True
    r = False if (whiteline ^ pins.digital_read_pin(pin_R)) == 0 else True
    if autonomni:
        
        if rovne:
            if pins.digital_read_pin(DigitalPin.P13) == okoli and pins.digital_read_pin(DigitalPin.P1) == okoli:
                motor_run(-140, -140)
                ignore = False
            elif pins.digital_read_pin(DigitalPin.P13) == linie and pins.digital_read_pin(DigitalPin.P1) == linie:
                motor_run(-140, -140)
                ignore = True

            elif pins.digital_read_pin(DigitalPin.P13) == okoli and pins.digital_read_pin(DigitalPin.P1) == linie:
                motor_run(-140, 100)

            elif pins.digital_read_pin(DigitalPin.P13) == linie and pins.digital_read_pin(DigitalPin.P1) == okoli:
                motor_run(100, -140)
            
            basic.pause(50)
        elif prava:
            if pins.digital_read_pin(DigitalPin.P13) == okoli and pins.digital_read_pin(DigitalPin.P1) == okoli:
                motor_run(-140, 100)
            elif pins.digital_read_pin(DigitalPin.P13) == linie and pins.digital_read_pin(DigitalPin.P1) == linie:
                motor_run(-140, 100)
            elif pins.digital_read_pin(DigitalPin.P13) == okoli and pins.digital_read_pin(DigitalPin.P1) == linie:
                motor_run(-140, 100)
            elif pins.digital_read_pin(DigitalPin.P13) == linie and pins.digital_read_pin(DigitalPin.P1) == okoli:
                motor_run(-140, -140)
                        
            basic.pause(50)

        elif left:
            
            if pins.digital_read_pin(DigitalPin.P13) == okoli and pins.digital_read_pin(DigitalPin.P1) == okoli:
                motor_run(100, -140)
            elif pins.digital_read_pin(DigitalPin.P13) == linie and pins.digital_read_pin(DigitalPin.P1) == linie:
                motor_run(100, -140)
            elif pins.digital_read_pin(DigitalPin.P13) == okoli and pins.digital_read_pin(DigitalPin.P1) == linie:
                motor_run(-140, -140)
            elif pins.digital_read_pin(DigitalPin.P13) == linie and pins.digital_read_pin(DigitalPin.P1) == okoli:
                motor_run(-140, -100)
                                    
            basic.pause(50)

        elif turn:
            global turn
            if pins.digital_read_pin(DigitalPin.P13) == okoli and pins.digital_read_pin(DigitalPin.P1) == okoli:
                motor_run(-100, 100)
            elif pins.digital_read_pin(DigitalPin.P13) == okoli and pins.digital_read_pin(DigitalPin.P1) == linie:
                turn = False
        
basic.forever(on_forever)
