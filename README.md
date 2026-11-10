# Gintanao — mobile app

The React Native (Expo) version of the [Gintanao](../gintanao) portal: browse homes for sale,
view a listing, browse PRC-verified agents and realties, and contact an agent. It has no
backend of its own and reads everything from the same Laravel API as the web portal
(`gintanao-backend`).

## Run it

```bash
npm install
cp .env.example .env.local      # then set EXPO_PUBLIC_API_BASE_URL
npx expo start                  # scan the QR code with Expo Go, or press a / i
```

The app calls the API **from the phone**, so `localhost` is the wrong host: on a phone or
emulator it means the device itself. Use your PC's LAN IP and start the backend on all
interfaces:

```bash
# in gintanao-backend
php artisan serve --host=0.0.0.0 --port=8000
```

Windows Firewall may need to allow inbound connections on port 8000.

## Scripts

```bash
npx expo start        # dev server
npm run typecheck     # tsc --noEmit
npx expo lint         # ESLint
npm run format        # Prettier (4-space, 100 columns, same as the web repo)
```

## Screens

| Tab / route       | What it shows                                                        |
| ----------------- | -------------------------------------------------------------------- |
| Home              | Search, featured homes, newest listings                              |
| Properties        | Search + status/type/sort filters, infinite scroll                   |
| Agents            | The agent directory                                                  |
| Realties          | The realty directory, searchable by name                             |
| More              | Contact, agent sign-up links, legal pages (opened on the web)        |
| `property/[slug]` | Gallery, facts, description, location, "Listed by" + contact buttons |
| `agent/[slug]`    | Profile, contact buttons, listings                                   |
| `realty/[slug]`   | Realty details, its agents and listings                              |
| `contact`         | Enquiry form (modal)                                                 |
