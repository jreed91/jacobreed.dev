// Served from this file rather than Prisma since there's no DATABASE_URL configured
export async function GET() {
    const projects = [
        {
            slug: "hinterland",
            name: "Hinterland",
            description:
                "An offline-first iOS app for the Hinterland Music Festival in St. Charles, Iowa. Cell service in a rural valley packed with 15,000 people is unusable, so the whole festival ships inside the binary — the four-day schedule across three stages, artist bios and artwork, the grounds and shuttle maps, the vendor directory, and eleven years of past lineups all work in airplane mode. Star sets to build a personal lineup with overlap detection, get on-device reminders before each one, and follow the set you're watching from the Lock Screen widget and Live Activity. The network is only ever used to enrich what's already there: set-time changes, the WeatherKit forecast for the amphitheater, Apple Music top songs, and crowd-sourced set ratings pooled through CloudKit — each cached and each falling back to what's on the phone.",
            image: "/static/images/avatar.jpeg"
        },
        {
            slug: "stride",
            name: "Stride",
            description:
                "A SwiftUI running coach for iOS that builds adaptive training plans and keeps them honest as life happens. It generates a plan from your goal race, tracks runs and strength sessions live with voice coaching and split announcements, and rebuilds the schedule around missed workouts instead of leaving you behind a plan you can't catch. An on-device coach layer reads your recent training, heart-rate zones and heat exposure to explain what each session is for and when to back off, with dedicated policies for heat adaptation and running through pregnancy. Route Genius generates new routes from where you're standing, workouts sync to HealthKit and CloudKit, and the whole thing surfaces on the Lock Screen through a Live Activity and Home Screen widgets.",
            image: "/static/images/avatar.jpeg"
        },
        {
            slug: "groceries",
            name: "Groceries",
            description:
                "A shared iOS grocery list for one household, backed by your own Supabase project rather than someone else's service. Two people add items and check them off and each sees the other's changes as they happen, with lists built from your stores, your catalog, and your own aisle order. Recipe links are imported by reading the schema.org data cooking sites already publish, then planned across a week and fanned out to the right store's list. The trip itself moves to the Lock Screen and Dynamic Island as a Live Activity — tappable rows in aisle order, started automatically when you walk into a shop you've pinned — with an Apple Watch app, a Home Screen widget, and Siri all writing through the one repository on the phone. Everything reads and writes locally first, so the list never waits on a signal at the back of a store, and the on-device Apple Intelligence layer that files unfamiliar items and tidies a messy catalog never sends your groceries anywhere.",
            image: "/static/images/avatar.jpeg"
        },
        {
            slug: "agentbar",
            name: "AgentBar",
            description:
                "A native macOS menu bar app that watches your terminal coding agents — Claude Code and GitHub Copilot CLI — and tells you when one is waiting on you. A zero-config Claude Code plugin hooks the points that matter (questions, permission requests, MCP elicitations, idle sessions, finished tasks) and posts them to a local server, which badges the menu bar and can bring the right terminal window back to the front. It's a notification tool, not an input tool: every prompt is still answered in your terminal, the hook returns immediately so a session is never blocked, and the whole path fails open — if the app is missing or erroring, the hook exits cleanly as though it were never installed.",
            image: "/static/images/avatar.jpeg"
        }
    ];

    return new Response(JSON.stringify(projects));
}
