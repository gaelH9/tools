import requests
from bs4 import BeautifulSoup
import sys


def main(url):
    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html.parser')
    target = soup.find(
        "div", class_="col-md-8 country-pop-description").find_all_next("strong")[1]
    print(target.text)


country = sys.argv[1].lower().replace(' ', '-')


main("https://www.worldometers.info/world-population/"+country+"-population/")