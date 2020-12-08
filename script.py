

from bs4 import BeautifulSoup
import requests
import sys

def youtubeTags():
    request = requests.get(sys.argv[1])
    
    html = BeautifulSoup(request.content,"html.parser")
    
    tags = html.find_all("meta",property="og:video:tag")
    
    for tag in tags:
        print(tag['content'] + "," )
        
        
youtubeTags()