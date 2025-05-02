import pandas as pd

# Read the file line by line and split only at the first comma
lines = []
with open("gitlog.csv", 'r') as f:
    for line in f:
        parts = line.strip().split(",", 1)  # Split at first comma only
        if len(parts) == 2:
            lines.append(parts)

# Create DataFrame
df = pd.DataFrame(lines, columns=["date", "message"])
df['date'] = pd.to_datetime(df['date'], errors='coerce')
df.dropna(subset=['date'], inplace=True)

# Preview the result
print(df.head(10))
