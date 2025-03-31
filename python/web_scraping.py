import requests
from bs4 import BeautifulSoup
import csv

# Hämta data från webbsidan
url = "https://ceoworld.biz/2024/02/12/swedens-largest-companies-by-market-capitalization-2024/"
response = requests.get(url)

if response.status_code == 200:  # Kontrollera HTTP-status
    soup = BeautifulSoup(response.text, "html.parser")

    # Hitta alla tabeller med klassen "default-table"
    tables = soup.find_all("table", class_=["tablepress", "tablepress-id-799"])

    if len(tables) > 0:
        table = tables[0]  # Använd den första tabellen

        rows = table.find_all("tr")  # Hämta alla rader i tabellen

        biggestCompaniesSwedenMarketCap = []

        for row in rows[1:]:  # Hoppa över header-raden
            cells = row.find_all("td")
            print(f"Found row: {[cell.text.strip() for cell in cells]}")

            if len(cells) >= 3:  # Kontrollera att raden har tillräckligt många celler
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

        # Spara data till en CSV-fil
        with open("biggest_companies_sweden_market_cap.csv", "w", newline="", encoding="utf-8") as csvFile:
            writer = csv.writer(csvFile, delimiter=";")
            # Skriv header
            writer.writerow(["Rank", "CompanyName", "Market Cap (USD$)"])
            # Skriv data
            writer.writerows(biggestCompaniesSwedenMarketCap)

        print("Data has been saved to biggest_companies_sweden_market_cap.csv")
    else:
        print("Could not find the correct table.")
else:
    print(f"Something went wrong. HTTP Status Code: {response.status_code}")
    print(f"URL: {url}")
