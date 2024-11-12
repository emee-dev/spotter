import { useSubmission } from "@solidjs/router";
import {
  AlertTriangle,
  ArrowRight,
  Box,
  Clock,
  Copy,
  Key,
  Radio,
  RotateCw,
} from "lucide-solid";
import { Show } from "solid-js";
import { createSignal } from "solid-js";
import {
  LargeRequestCard,
  Payload,
  SmallRequestCard,
} from "~/components/request-cards";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";
import { showToast } from "~/components/ui/toast";
import { updateProjectAction } from "~/lib/db/action";
// import { Input } from "~/components/ui/input";

// Mock data with sparkline data points
const issues: Payload[] = [
  {
    id: "1",
    error: {
      name: "TypeError",
      file: "apply/utils/src/instrumentation",
      line: 30,
      column: 10,
      message: "Failed to fetch resource",
      function: "fetchData",
    },
    stack: [
      {
        file: "apply/utils/src/instrumentation",
        line: 29,
        column: 5,
        function: "initializeRequest",
        method: "GET",
      },
      {
        file: "apply/utils/src/instrumentation",
        line: 30,
        column: 10,
        function: "fetchData",
        method: null,
      },
    ],
    request: {
      method: "GET",
      url: "/projects/direct/backend/releases/v7210",
      params: { projectId: "404" },
      query: { search: "true" },
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: "Bearer some_token_here",
      },
    },
    response: {
      status: 404,
      params: { errorCode: "404" },
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    },
    system: {
      ip: "192.168.1.1",
      arch: "x64",
      platform: "macOS",
    },
    timestamp: "2024-11-04T08:30:00Z",
  },
  {
    id: "2",
    error: {
      name: "ForbiddenError",
      file: "fetchData/app/components/HoverCard",
      line: 15,
      column: 8,
      message: "User does not have permission to access this resource",
      function: "authorizeUser",
    },
    stack: [
      {
        file: "app/components/HoverCard",
        line: 15,
        column: 8,
        function: "authorizeUser",
        method: "POST",
      },
    ],
    request: {
      method: "POST",
      url: "/api/user/update",
      params: null,
      query: null,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Content-Type": "application/json",
        Authorization: "Bearer another_token",
      },
    },
    response: null,
    system: {
      ip: null,
      arch: "x64",
      platform: "Windows",
    },
    timestamp: "2024-11-04T03:05:00Z",
  },
  {
    id: "3",
    error: {
      name: "ZodSchemaError",
      file: "validateData/app/forms/UserForm",
      line: 42,
      column: 15,
      message: "Input validation failed for user input",
      function: "validateUserInput",
    },
    stack: [
      {
        file: "app/forms/UserForm",
        line: 42,
        column: 15,
        function: "validateUserInput",
        method: "PUT",
      },
      {
        file: "app/forms/UserForm",
        line: 10,
        column: 8,
        function: "handleSubmit",
        method: null,
      },
    ],
    request: {
      method: "PUT",
      url: "/api/user/12345",
      params: { userId: "12345" },
      query: { validate: "true" },
      headers: {
        "User-Agent": "Mozilla/5.0 (Linux; Android 10)",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
    response: {
      status: 422,
      params: { statusCode: "422" },
      headers: {
        "Content-Type": "application/json",
        "Retry-After": "120",
      },
    },
    system: {
      ip: "10.0.0.25",
      arch: "arm",
      platform: "Android",
    },
    timestamp: "2024-11-03T18:45:00Z",
  },
];

export default function ProjectsDashboard() {
  const [searchQuery, setSearchQuery] = createSignal("");

  return (
    <div class="flex-1 overflow-auto p-4 space-y-4">
      <Tabs defaultValue="overview" class="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" class="text-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="requests" class="text-sm">
            Requests
          </TabsTrigger>
          <TabsTrigger value="endpoints" class="text-sm">
            Endpoints
          </TabsTrigger>

          <TabsTrigger value="settings" class="text-sm">
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" class="space-y-4">
          <div class="grid gap-4">
            <Card>
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <div class="flex items-center gap-2 text-sm text-muted-foreground">
                      <Box class="h-4 w-4" />
                      Requests
                    </div>
                    <p class="text-2xl font-bold">459</p>
                  </div>
                  <div class="space-y-2">
                    <div class="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock class="h-4 w-4" />
                      Requests per minute
                    </div>
                    <p class="text-2xl font-bold">0</p>
                  </div>
                  <div class="space-y-2">
                    <div class="flex items-center gap-2 text-sm text-muted-foreground">
                      <AlertTriangle class="h-4 w-4" />
                      Problems
                    </div>
                    <p class="text-2xl font-bold">4</p>
                  </div>
                  <div class="space-y-2">
                    <div class="flex items-center gap-2 text-sm text-muted-foreground">
                      <Radio class="h-4 w-4" />
                      Endpoints
                    </div>
                    <p class="text-2xl font-bold">9</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">API Score</CardTitle>
                <Button
                  variant="link"
                  size="sm"
                  class="text-sm text-muted-foreground"
                >
                  View details
                  <ArrowRight class="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div class="grid grid-cols-3 gap-4">
                  <div class="space-y-2">
                    <div class="flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary">
                      <span class="text-xl font-bold">73</span>
                    </div>
                    <p class="text-sm text-muted-foreground">Performance</p>
                  </div>
                  <div class="space-y-2">
                    <div class="flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary">
                      <span class="text-xl font-bold">58</span>
                    </div>
                    <p class="text-sm text-muted-foreground">Security</p>
                  </div>
                  <div class="space-y-2">
                    <div class="flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary">
                      <span class="text-xl font-bold">65</span>
                    </div>
                    <p class="text-sm text-muted-foreground">Quality</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Team members</CardTitle>
                <Button
                  variant="link"
                  size="sm"
                  class="text-sm text-muted-foreground"
                >
                  Manage
                  <ArrowRight class="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent class="space-y-4">
                <h3 class="font-semibold">Invite new members</h3>
                <p class="text-sm text-muted-foreground">
                  You can add one or more e-mails and invite them to your
                  project.
                </p>
                <div class="flex gap-2">
                  {/* <Input placeholder="Separate new emails with a comma" /> */}
                  <Button>Send invite</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requests" class="space-y-2">
          {issues.map((issue) => (
            <LargeRequestCard
              id={issue.id}
              error={issue.error}
              request={issue.request}
              system={issue.system}
              timestamp={issue.timestamp}
              // response={issue.response}
            />
          ))}
        </TabsContent>

        <TabsContent value="endpoints" class="space-y-2">
          {issues.map((issue) => (
            <SmallRequestCard
              id={issue.id}
              request={issue.request}
              response={issue.response}
              timestamp={issue.timestamp}
            />
          ))}
        </TabsContent>

        <TabsContent value="settings">
          <SettingsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SettingsTabContent() {
  const [apiKey, setApiKey] = createSignal("");
  const [teamUrl, setTeamUrl] = createSignal("my-project");

  const updateProject = useSubmission(updateProjectAction);

  const handleGenerateApiKey = () => {
    // In a real app, this would make an API call
    const newKey = "pk_" + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
    showToast({
      title: "API Key Generated",
      description: "Your new API key has been generated successfully.",
    });
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey());
    showToast({
      title: "Copied",
      description: "API key copied to clipboard",
    });
  };

  return (
    <div class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project</CardTitle>
        </CardHeader>
        <form action={updateProjectAction} method="post">
          <CardContent class="space-y-4">
            <TextField class="space-y-2">
              <TextFieldLabel for="projectLabel">Label</TextFieldLabel>
              <TextFieldInput
                id="projectLabel"
                name="projectLabel"
                type="text"
                placeholder="Service name"
                maxLength={32}
              />
            </TextField>
            <TextField class="space-y-2">
              <TextFieldLabel for="baseUrl">Base URL</TextFieldLabel>
              <TextFieldInput
                id="baseUrl"
                name="baseUrl"
                type="text"
                placeholder="https://localhost:3000/"
                maxLength={32}
              />
            </TextField>
          </CardContent>
          <CardFooter>
            <Show
              when={updateProject.pending}
              fallback={<Button type="submit">Save</Button>}
            >
              {(_) => (
                <Button disabled type="submit">
                  Saving <RotateCw class="ml-2 size-4 animate-spin" />
                </Button>
              )}
            </Show>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Generate and manage API keys to authenticate your requests.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            {apiKey() && (
              <div class="flex items-center gap-2">
                <TextFieldInput value={apiKey()} type="text" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyApiKey}
                >
                  <Copy class="h-4 w-4" />
                  <span class="sr-only">Copy API key</span>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerateApiKey}>
            <Key class="mr-2 h-4 w-4" />
            Generate New API Key
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team URL</CardTitle>
          <CardDescription>
            This is your team&apos;s URL namespace on the platform. Within it,
            your team can inspect their projects, check out any recent activity,
            or configure settings to their liking.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <TextField class="space-y-2">
            <Label for="teamUrl">URL</Label>
            <div class="flex">
              <div class="flex h-10 items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
                app.example.com/
              </div>
              <TextFieldInput
                id="teamUrl"
                type="text"
                value={teamUrl()}
                onChange={(e) => setTeamUrl(e.target.value)}
                class="rounded-l-none"
                maxLength={48}
              />
            </div>
            <p class="text-sm text-muted-foreground">
              Please use 48 characters at maximum.
            </p>
          </TextField>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
