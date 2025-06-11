# backend/report.py
from jinja2 import Template
from weasyprint import HTML
from datetime import datetime
import os

HTML_TEMPLATE = """
<html>
<head>
    <style>
        body { font-family: sans-serif; padding: 20px; }
        h1 { color: #333; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; }
    </style>
</head>
<body>
    <h1>Model Report - {{ model_name }}</h1>
    <p><strong>Date:</strong> {{ date }}</p>

    <h2>Metrics</h2>
    <table>
        <tr>
            <th>Metric</th><th>Value</th>
        </tr>
        {% for key, value in metrics.items() %}
        <tr><td>{{ key }}</td><td>{{ value }}</td></tr>
        {% endfor %}
    </table>

    <h2>Drift Report Summary</h2>
    <pre>{{ drift_summary }}</pre>
</body>
</html>
"""

def generate_pdf(model_name: str, metrics: dict, drift_summary: str):
    rendered = Template(HTML_TEMPLATE).render(
        model_name=model_name,
        metrics=metrics,
        drift_summary=drift_summary,
        date=datetime.now().strftime('%Y-%m-%d %H:%M')
    )
    output_path = f"reports/{model_name.replace('.pkl', '')}_report.pdf"
    os.makedirs("reports", exist_ok=True)
    HTML(string=rendered).write_pdf(output_path)
    return output_path
