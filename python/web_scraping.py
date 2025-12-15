import requests
from bs4 import BeautifulSoup
import csv

# Fetch data from the webpage
url = "https://ceoworld.biz/2024/02/12/swedens-largest-companies-by-market-capitalization-2024/"
response = requests.get(url)

if response.status_code == 200:  # Check HTTP status
    soup = BeautifulSoup(response.text, "html.parser")

    # Find all tables with the class "default-table" (or specific IDs)
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

                    biggestCompaniesSwedenMarketCap.append(
                        [Rank, CompanyName, MarketCap]
                    )

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