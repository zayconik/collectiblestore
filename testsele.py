
# from selenium import webdriver
# from selenium.webdriver.common.keys import Keys
# chrome_driver='C:\Users\user\Desktop\driver\chromedriver.exe'
# driver=webdriver.Chrome(chrome_driver)
# driver.get('https://www.google.com')


from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# create a new Chrome browser instance
driver = webdriver.Chrome()

# navigate to the website
driver.get("https://www.example.com")

# wait for the search input field to be visible
search_input = WebDriverWait(driver, 10).until(
    EC.visibility_of_element_located((By.NAME, "q"))
)

# enter the search query
search_input.send_keys("your search query")

# submit the form or hit Enter key
search_input.submit()

# wait for the search results page to load
WebDriverWait(driver, 10).until(
    EC.title_contains("Search Results")
)

# example: print the page title
print(driver.title)

# close the browser
driver.quit()
