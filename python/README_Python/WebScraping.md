# Web Scraping with BeautifulSoup

A practical guide for extracting data from HTML tables using Python's requests and BeautifulSoup libraries.

## Overview

This script demonstrates how to scrape structured data from web pages, specifically targeting HTML tables. The example extracts Swedish company market capitalization data and saves it to a CSV file for further analysis.

## Prerequisites

Install the required dependencies:

```bash
pip install requests beautifulsoup4
```

## How It Works

### 1. Fetch HTML Data
The script sends an HTTP GET request to retrieve the webpage content:

```python
import requests
from bs4 import BeautifulSoup

url = "https://ceoworld.biz/2024/02/12/swedens-largest-companies-by-market-capitalization-2024/"
response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.text, "html.parser")
```

### 2. Parse HTML and Locate Tables
Find tables by class or ID attributes:

```python
# Find tables by class name
tables = soup.find_all("table", class_=["tablepress", "tablepress-id-799"])

if len(tables) > 0:
    table = tables[0]  # Use the first matching table
    rows = table.find_all("tr")  # Get all rows
```

### 3. Extract Data from Table Cells
Iterate through rows and extract cell data:

```python
biggestCompaniesSwedenMarketCap = []

for row in rows[1:]:  # Skip header row
    cells = row.find_all("td")
    
    if len(cells) >= 3:  # Ensure row has enough cells
        try:
            Rank = cells[0].text.strip()
            CompanyName = cells[1].text.strip()
            MarketCap = cells[2].text.strip().replace("$", "").replace("B", "Billion").replace("M", "Million")
            
            biggestCompaniesSwedenMarketCap.append([Rank, CompanyName, MarketCap])
        except IndexError:
            print(f"Skipping row due to missing data: {cells}")
            continue
```

### 4. Save Data to CSV
Export the extracted data to a CSV file:

```python
import csv

with open("biggest_companies_sweden_market_cap.csv", "w", newline="", encoding="utf-8") as csvFile:
    writer = csv.writer(csvFile, delimiter=";")
    # Write header
    writer.writerow(["Rank", "CompanyName", "Market Cap (USD$)"])
    # Write data
    writer.writerows(biggestCompaniesSwedenMarketCap)
```

## Complete Example

Here's the full working script:

```python
import requests
from bs4 import BeautifulSoup
import csv

# Fetch data from the webpage
url = "https://ceoworld.biz/2024/02/12/swedens-largest-companies-by-market-capitalization-2024/"
response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.text, "html.parser")

    # Find all tables with the class "tablepress" or specific ID
    tables = soup.find_all("table", class_=["tablepress", "tablepress-id-799"])

    if len(tables) > 0:
        table = tables[0]  # Use the first table
        rows = table.find_all("tr")  # Get all rows in the table

        biggestCompaniesSwedenMarketCap = []

        for row in rows[1:]:  # Skip the header row
            cells = row.find_all("td")
            print(f"Found row: {[cell.text.strip() for cell in cells]}")

            if len(cells) >= 3:  # Check that the row has enough cells
                try:
                    Rank = cells[0].text.strip()
                    CompanyName = cells[1].text.strip()
                    MarketCap = cells[2].text.strip().replace("$", "").replace("B", "Billion").replace("M", "Million")

                    biggestCompaniesSwedenMarketCap.append([Rank, CompanyName, MarketCap])
                except IndexError:
                    print(f"Skipping a row due to missing data: {cells}")
                    continue

        # Save data to a CSV file
        with open("biggest_companies_sweden_market_cap.csv", "w", newline="", encoding="utf-8") as csvFile:
            writer = csv.writer(csvFile, delimiter=";")
            # Write header
            writer.writerow(["Rank", "CompanyName", "Market Cap (USD$)"])
            # Write data
            writer.writerows(biggestCompaniesSwedenMarketCap)

        print("Data has been saved to biggest_companies_sweden_market_cap.csv")
    else:
        print("Could not find the correct table.")
else:
    print(f"Something went wrong. HTTP Status Code: {response.status_code}")
    print(f"URL: {url}")
```

## Adapting for Different Websites

### Finding the Right Table
Use browser developer tools to inspect the HTML structure:

```python
# Find by ID
table = soup.find("table", id="specific-table-id")

# Find by class
table = soup.find("table", class_="table-class-name")

# Find by multiple classes
tables = soup.find_all("table", class_=["class1", "class2"])

# Find by CSS selector
table = soup.select_one("table.data-table tbody")
```

### Handling Different Table Structures
```python
# Handle tables with headers in <th> tags
headers = [th.text.strip() for th in table.find_all("th")]
rows = table.find_all("tr")

# Handle nested tables
nested_tables = table.find_all("table")

# Handle tables with colspan/rowspan
for cell in cells:
    colspan = cell.get("colspan")
    rowspan = cell.get("rowspan")
```

### Error Handling and Robustness
```python
# Add timeout to requests
response = requests.get(url, timeout=10)

# Handle different HTTP status codes
if response.status_code == 404:
    print("Page not found")
elif response.status_code == 403:
    print("Access forbidden - check robots.txt")
elif response.status_code == 500:
    print("Server error")

# Add retry logic
import time
for attempt in range(3):
    try:
        response = requests.get(url)
        break
    except requests.exceptions.RequestException as e:
        if attempt < 2:
            time.sleep(2)  # Wait before retrying
            continue
        else:
            raise e
```

## Best Practices

### 1. Respect Website Terms of Service
- Always check the website's robots.txt file
- Respect rate limits and don't overload servers
- Check the website's terms of service for scraping permissions

### 2. Handle Dynamic Content
For JavaScript-rendered content, consider using Selenium:

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get(url)
# Wait for content to load
driver.implicitly_wait(10)
html = driver.page_source
soup = BeautifulSoup(html, "html.parser")
```

### 3. Data Cleaning
```python
# Remove extra whitespace
text = "  Some text with spaces  ".strip()

# Handle different number formats
import re
market_cap = re.sub(r'[^\d.]', '', market_cap_text)

# Convert to appropriate data types
rank = int(rank_text)
market_cap_numeric = float(market_cap_text.replace(',', ''))
```

### 4. User-Agent Headers
Some websites block requests without proper headers:

```python
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}
response = requests.get(url, headers=headers)
```

## Example Output

The script generates a CSV file with the following structure:

```
Rank;CompanyName;Market Cap (USD$)
1;VOLVO AB;100.5Billion
2;ERICSSON;85.2Billion
3;SEB;72.1Billion
...
```

## Common Issues and Solutions

### Issue: Table not found
**Solution**: Inspect the HTML structure and update the selector

### Issue: Missing data in some rows
**Solution**: Add proper error handling and validation

### Issue: Encoding problems
**Solution**: Use proper encoding when reading and writing files

### Issue: Website blocks requests
**Solution**: Add appropriate headers and consider using proxies

This web scraping approach provides a solid foundation for extracting structured data from HTML tables and can be easily adapted for different websites and data sources.
