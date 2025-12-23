# Data Analysis Toolkit

Essential Python scripts for data manipulation, visualization, and predictive modeling using pandas, matplotlib, seaborn, and scikit-learn.

## Core Utilities

### 1. Data Loader (Pandas)
Load and preview CSV datasets:

```python
import pandas as pd
data = pd.read_csv('your_file.csv')
print(data.head())  # Show first 5 rows
```

## Visualization Components

### 2. Line Chart
Track changes over time:

```python
plt.plot(data['time_column'], data['value_column'])
plt.xlabel('Time'); plt.ylabel('Value')
plt.title('Simple Line Graph')
```

### 3. Bar Chart
Compare categorical data:

```python
sns.countplot(x='category_column', data=data)
plt.title('Category Counts')
```

### 4. Scatter Plot
Identify variable relationships:

```python
sns.scatterplot(x='variable1', y='variable2', data=data)
plt.title('Scatter Plot Between Variables')
```

### 5. Correlation Matrix
Show variable relationships:

```python
corr = data.corr()
sns.heatmap(corr, annot=True, cmap='coolwarm')
plt.title('Correlation Matrix')
```

### 6. Histogram
Visualize data distribution:

```python
plt.hist(data['numeric_column'], bins=30)
plt.title('Histogram of Numeric Column')
```

### 7. Box Plot
Display data quartiles and outliers:

```python
sns.boxplot(x='category_column', y='numeric_column', data=data)
plt.title('Box Plot for Numeric Column')
```

## Predictive Modeling

### 8. Linear Regression
Predict relationships between variables:

```python
from sklearn.linear_model import LinearRegression
X = data[['independent_variable1', 'independent_variable2']]
y = data['dependent_variable']
model = LinearRegression().fit(X, y)
predictions = model.predict(X)
```

## Dependencies

* **Pandas**: Data manipulation and CSV handling
* **Matplotlib & Seaborn**: Data visualization
* **Scikit-learn**: Machine learning algorithms

## Usage Notes

- Replace column names with your actual data column names
- Adjust plot parameters (bins, colors, etc.) as needed
- Always check data quality before analysis
- Use appropriate chart types for your data relationships
