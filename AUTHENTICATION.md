# Anonymous Authentication Implementation Guide

## What Was Implemented

Your Next.js app now has a complete anonymous authentication system with MongoDB and NextAuth.js. Here's what's working:

### 1️⃣ Automatic Credential Generation
- **First-time visitors** see a modal on the homepage with a button to "Generate My Credentials"
- **Username format**: `AdjectiveAnimal#XXXX` (e.g., `FitWolf#4821`)
- **Password**: 8 random characters with special characters
- **Warning banner**: "Save these — we cannot recover them if lost"
- **Copy buttons**: Easy copy-to-clipboard for both username and password

### 2️⃣ Login Page
- **Route**: `/login`
- **Purpose**: Returning users enter their saved username and password
- **Behavior**: 
  - Validates credentials against MongoDB
  - Redirects to `/profile` on success
  - Shows error message on invalid credentials
  - Unauthenticated users are automatically redirected here

### 3️⃣ User Profile Page
- **Route**: `/profile` (protected - redirects to `/login` if not authenticated)
- **Features**:
  - Displays username and member since date
  - Edit fitness profile (bio, fitness goal, avatar)
  - Save profile changes to MongoDB
  - Logout button

### 4️⃣ Database Schema
All user data stored in MongoDB under `users` collection:
```javascript
{
  _id: ObjectId,
  username: string,           // Unique generated username
  hashedPassword: string,     // bcrypt hashed
  createdAt: Date,
  profile: {
    bio?: string,
    fitnessGoal?: string,
    avatar?: string
  }
}
```

### 5️⃣ Security Features
- ✅ Passwords hashed with bcrypt (10 salts)
- ✅ NextAuth.js JWT sessions (30-day expiration)
- ✅ Protected routes with middleware
- ✅ No personal data collected (only username, password, and profile data)
- ✅ CSRF protection via NextAuth.js

## File Structure

```
lib/
  ├── db.ts                    # MongoDB connection
  ├── auth-utils.ts           # Password hashing, credential generation
  ├── auth.ts                  # NextAuth.js configuration
  └── models/
      └── User.ts             # User type definitions

app/
  ├── api/
  │   ├── auth/
  │   │   ├── [...nextauth]/route.ts    # NextAuth API handler
  │   │   └── signup/route.ts           # Generate credentials endpoint
  │   └── user/
  │       └── profile/route.ts          # Get/update user profile
  ├── login/page.tsx           # Login page
  └── profile/page.tsx         # User profile page

components/
  ├── SignupModal.tsx          # First-time signup modal
  ├── AuthSessionProvider.tsx  # Session provider wrapper
  └── HomePageClient.tsx       # Home page client wrapper

middleware.ts                  # Route protection middleware
types/next-auth.d.ts          # NextAuth type extensions
```

## Environment Variables Required

Make sure these are in your `.env.local`:
```
MONGODB_URI=mongodb+srv://...
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000  # or your production URL
```

## How It Works - User Journey

### First-Time User:
1. Lands on homepage → sees signup modal
2. Clicks "Generate My Credentials" → gets unique username + password
3. Copies and saves them (or skips)
4. Can now visit `/login` to create an account when ready

### Returning User:
1. Goes to `/login`
2. Enters saved username + password
3. Gets logged in → redirected to `/profile`
4. Can edit profile and continue using the app

## API Endpoints

### `POST /api/auth/signup`
Generates a new anonymous user account.
**Response:**
```json
{
  "username": "BraveHawk#7284",
  "password": "k9$mQ2xL",
  "message": "Save these credentials — we cannot recover them if lost"
}
```

### `POST /api/auth/callback/credentials`
Handles login (NextAuth default).

### `GET /api/user/profile`
Fetch current user's profile (requires auth).

### `POST /api/user/profile`
Update current user's profile (requires auth).
**Body:**
```json
{
  "bio": "...",
  "fitnessGoal": "build-muscle",
  "avatar": "💪"
}
```

## Testing Locally

1. Start dev server: `npm run dev`
2. Visit `http://localhost:3000`
3. Click "Generate My Credentials" button in modal
4. Save the credentials somewhere
5. Refresh page (modal won't show again - stored in localStorage)
6. Visit `/login`
7. Enter the credentials you saved
8. You should be redirected to `/profile`

## Important Notes

- ✅ Existing design and functionality preserved (no breaking changes)
- ✅ Modal only shows once per browser (stored in localStorage as `signup_modal_shown`)
- ✅ Generated credentials stored in localStorage as `generated_credentials` for quick reference
- ⚠️ MongoDB connection must be established for auth to work
- ⚠️ Passwords cannot be recovered - users must save them immediately

## Next Steps (Optional)

If you want to enhance this further, consider:
- Add email notification when credentials are generated
- Add backup codes for account recovery
- Add account deletion functionality
- Add activity logs
- Add two-factor authentication (optional - currently anonymous)

---

**Built with:**
- Next.js 16
- NextAuth.js v5
- MongoDB
- bcryptjs
- TypeScript
- TailwindCSS
