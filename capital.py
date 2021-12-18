from countryinfo import CountryInfo
import sys

country = sys.argv[1]

capital = CountryInfo(country).capital()

print(capital)