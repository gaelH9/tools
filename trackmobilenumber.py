from phonenumbers import geocoder

from phonenumbers import carrier
import phonenumbers

import sys


number1 = sys.argv[1]


number1 = phonenumbers.parse(number1)


print("The Country of the Number is " + geocoder.description_for_number(number1,"en") + "\nThe Sim Card of the mobile number is " + carrier.name_for_number(number1,"en"))
