from evidently.test_suite import TestSuite
from evidently.tests import TestColumnDrift

import pandas as pd

# Placeholder reference dataset
reference_df = pd.DataFrame({
    "feature1": [0.1, 0.2, 0.3, 0.4],
    "feature2": [1, 0, 1, 0]
})

def check_drift(new_df):
    suite = TestSuite(tests=[
        TestColumnDrift(column_name="feature1"),
        TestColumnDrift(column_name="feature2")
    ])
    suite.run(reference_data=reference_df, current_data=new_df)
    return suite.as_dict()
