
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import StaleElementReferenceException, TimeoutException
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import os

# Disable browser automation features to bypass detection
options = Options()
options.add_experimental_option("detach", True)
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option('useAutomationExtension', False)
options.add_argument("--disable-blink-features=AutomationControlled")
options.add_argument("window-size=1280,800")
options.add_argument("--disable-popup-blocking")
options.add_argument("--disable-save-password-bubble")

# Function to save data to an Excel file
def save_to_excel(data, filename):
    if os.path.exists(filename):
        df_existing = pd.read_excel(filename, engine='openpyxl')
        df_new = pd.DataFrame(data, columns=["tweets"])
        df_combined = pd.concat([df_existing, df_new], ignore_index=True)
        df_combined.to_excel(filename, index=False, engine='openpyxl')
    else:
        df = pd.DataFrame(data, columns=["tweets"])
        df.to_excel(filename, index=False, engine='openpyxl')

# Initialize the Chrome driver
driver = webdriver.Chrome(options=options)

# Go to the Google Sign-In page
driver.get("https://accounts.google.com/v3/signin/identifier?hl=en_gb&ifkv=axo7b7vgp4y_gnfwpri72zv40ii9kmgybvlrxoohoebnkebycmpcpox_aolo1vk16fetaa4urmifua&flowname=glifwebsignin&flowentry=servicelogin&dsh=s-1140670556%3a1692882589574310")
# Alternative login - provider-specific login page
# driver.get("https://account.proton.me/login")

# Enter email and click next
email = 'rexrajabora@gmail.com'
driver.find_element(By.XPATH, '//*[@id="identifierId"]').send_keys(email)
time.sleep(3)
driver.find_element(By.XPATH, '//*[@id="identifierNext"]/div/button/span').click()
time.sleep(5)

# Enter password and click next
password = 'imafoolishguylol?????'
driver.find_element(By.XPATH, '//*[@id="password"]/div[1]/div/div[1]/input').send_keys(password)
driver.find_element(By.XPATH, '//*[@id="passwordNext"]/div/button/span').click()
time.sleep(5)

# Go to Twitter
driver.get("https://twitter.com/")
time.sleep(10)

# Define hashtags to search for
hashtags = ['wow', 'funny', 'go']

# Initialize lists for storing unique tweets
unique_texts = []
seen_texts = set()

# Search for each hashtag and scrape tweets
for hashtag in hashtags:
    driver.get("https://twitter.com/explore")
    time.sleep(5)
    
    search = driver.find_element(By.XPATH,
        '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div[1]/div[1]/div/div/div/div/div/div[1]/div[2]/div/div/div/form/div[1]/div/div/div/label/div[2]/div/input')
    search.send_keys(hashtag + " lang:en")  # Add " lang:en" to filter English tweets
    search.send_keys(Keys.ENTER)
    time.sleep(5)
    
    actions = webdriver.ActionChains(driver)
    previous_num_unique = 0  # Track the number of unique tweets in the previous iteration
    
    while True:
        # Scroll 10 times
        for _ in range(10):
            actions.send_keys(Keys.PAGE_DOWN).perform()
            time.sleep(3)
        
        # Fetch tweet data
        t_data = driver.find_elements(By.XPATH,
            "//div[starts-with(@class,'css-901oao r-18jsvk2 r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0')]")
        
        # Store unique tweets in a set
        for i in t_data:
            try:
                tweet_text = i.text
                if tweet_text not in seen_texts:
                    unique_texts.append(tweet_text)
                    seen_texts.add(tweet_text)
            except StaleElementReferenceException:
                # If a StaleElementReferenceException occurs, break out of the loop
                # and re-fetch the tweets
                break
        
        if len(unique_texts) == previous_num_unique:
            break
        
        previous_num_unique = len(unique_texts)
        
        for text in unique_texts:
            print(text)
        
        print(len(unique_texts))
        
        # Save the tweets to the Excel file after processing each hashtag
        save_to_excel(list(unique_texts), "tweets.xlsx")

# Print the unique tweets
for text in unique_texts:
    print(text)

# Close the driver
driver.quit()
