import { Card, Title, Text, Grid, Metric, Flex } from "@tremor/react";
import DashboardLayout from "../components/dashboard-layout";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Monitor your ML models and track their performance
          </p>
        </div>

        <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
          <Card>
            <Flex alignItems="start">
              <div>
                <Text>Active Models</Text>
                <Metric>24</Metric>
              </div>
            </Flex>
          </Card>
          <Card>
            <Flex alignItems="start">
              <div>
                <Text>Drift Detected</Text>
                <Metric>3</Metric>
              </div>
            </Flex>
          </Card>
          <Card>
            <Flex alignItems="start">
              <div>
                <Text>Total Predictions</Text>
                <Metric>1,429</Metric>
              </div>
            </Flex>
          </Card>
        </Grid>

        <Card>
          <Title>Recent Activity</Title>
          <Text className="mt-4">Your ML models monitoring activity will appear here</Text>
        </Card>
      </div>
    </DashboardLayout>
  )
}
