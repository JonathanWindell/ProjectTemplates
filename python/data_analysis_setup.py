import pandas as pd

# Load dataset
data = pd.read_csv('your_file.csv')

# Show the first 5 rows
print(data.head())


# Show the last 5 rows
import matplotlib.pyplot as plt

# Example data
data = pd.read_csv('your_file.csv')

# Plot a simple line graph
plt.plot(data['time_column'], data['value_column'])
plt.xlabel('Time')
plt.ylabel('Value')
plt.title('Simple Line Graph')
plt.show()


# Example of bar chart
import seaborn as sns
import matplotlib.pyplot as plt

# Example data
data = pd.read_csv('your_file.csv')

# Create a bar chart for categorical data
sns.countplot(x='category_column', data=data)
plt.title('Category Counts')
plt.show()


# Example of scatter plot
import seaborn as sns
import matplotlib.pyplot as plt

# Example data
data = pd.read_csv('your_file.csv')

# Create a scatter plot
sns.scatterplot(x='variable1', y='variable2', data=data)
plt.title('Scatter Plot Between Variable1 and Variable2')
plt.show()


# Example of correlation matrix
import seaborn as sns
import matplotlib.pyplot as plt

# Example data
data = pd.read_csv('your_file.csv')

# Calculate the correlation matrix
corr = data.corr()

# Create a heatmap of the correlation matrix
sns.heatmap(corr, annot=True, cmap='coolwarm', fmt='.2f')
plt.title('Correlation Matrix')
plt.show()


# Example of histogram
import matplotlib.pyplot as plt

# Example data
data = pd.read_csv('your_file.csv')

# Plot a histogram for a numeric column
plt.hist(data['numeric_column'], bins=30, color='skyblue', edgecolor='black')
plt.xlabel('Value')
plt.ylabel('Frequency')
plt.title('Histogram of Numeric Column')
plt.show()

# Example of box plot
import seaborn as sns
import matplotlib.pyplot as plt

# Example data
data = pd.read_csv('your_file.csv')

# Create a box plot
sns.boxplot(x='category_column', y='numeric_column', data=data)
plt.title('Box Plot for Numeric Column')
plt.show()


# Example of linear regression
from sklearn.linear_model import LinearRegression
import pandas as pd

# Load dataset
data = pd.read_csv('your_file.csv')

# Define independent and dependent variables
X = data[['independent_variable1', 'independent_variable2']]
y = data['dependent_variable']

# Train the linear regression model
model = LinearRegression()
model.fit(X, y)

# Get the model's predictions
predictions = model.predict(X)

# Output predictions
print(predictions)