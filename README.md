# 🚀 PDFMantra - Smart PDF Workspace

A powerful, browser-side PDF editing tool built with Next.js 15, TypeScript, and Supabase. Edit PDFs directly in your browser with complete privacy - your files never leave your device.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://smart-pdf-tools-pro-five.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-green?style=for-the-badge&logo=supabase)](https://supabase.com/)

## 🌟 Features

### Free Tier
- ✅ Upload and preview PDFs (unlimited pages)
- ✅ Select & copy real PDF text
- ✅ Text box annotations with custom fonts/colors
- ✅ Highlight selectable PDF text
- ✅ Move & resize objects with drag-and-drop
- ✅ Export edited PDF (full document or current page)
- ✅ 100% browser-side processing (completely private)
- ✅ Basic signature & image insertion
- ✅ Keyboard shortcuts (Del, Esc, Ctrl+Z/Y)
- ✅ Undo/redo history

### Pro Tier (₹499/month)
- ✅ Everything in Free
- ✅ Edit existing PDF text in-place
- 🔄 AI-powered text replacement (planned)
- 🔄 Scanned PDF OCR recognition (planned)
- 🔄 PDF to Word/Excel conversion (planned)
- 🔄 High-quality compression (planned)
- 🔄 Saved signature library (planned)
- 🔄 Export selected page ranges
- 🔄 Higher usage limits (100 PDFs/month)
- 🔄 Priority processing queue
- 🔄 Email support

### Business Tier (Custom pricing)
- ✅ Everything in Pro
- 🔄 Team workspace & collaboration
- 🔄 Bulk PDF processing
- 🔄 Advanced automation
- 🔄 Admin controls
- 🔄 Custom usage limits
- 🔄 24/7 priority support
- 🔄 SSO & enterprise security

## 🛠 Tech Stack

- **Framework**: [Next.js 15.1.11](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5.x](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4.1](https://tailwindcss.com/)
- **PDF Rendering**: [pdfjs-dist 4.11.1](https://mozilla.github.io/pdf.js/)
- **PDF Manipulation**: [pdf-lib 1.17.1](https://pdf-lib.js.org/)
- **Authentication**: [Supabase Auth](https://supabase.com/docs/guides/auth)
- **Database**: [Supabase Postgres](https://supabase.com/docs/guides/database)
- **Deployment**: [Vercel](https://vercel.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Live Demo

**Production**: [https://smart-pdf-tools-pro-five.vercel.app](https://smart-pdf-tools-pro-five.vercel.app)

### Test Accounts
- **Pro User**: shubham10a50@gmail.com (tier: pro)
- **Free User**: testfree@gmail.com / free@123 (tier: free)

## 📦 Installation

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Supabase account
- Vercel account (for deployment)

### 1. Clone the Repository
```bash
git clone https://github.com/sTechnoWizards/PDF-Tools-Pro.git
cd PDF-Tools-Pro
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Supabase

#### Create a Supabase Project
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Note your project URL and anon key

#### Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

#### Run Database Migration
1. Open Supabase SQL Editor: `https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql/new`
2. Run `supabase-setup.sql` (creates profiles table with RLS)
3. Run `supabase-tier-migration.sql` (adds 3-tier system: free/pro/business)

#### Enable Authentication Providers
1. Go to Authentication → Providers
2. Enable **Email** provider
3. Enable **Google OAuth** (optional):
   - Add callback URL: `https://your-domain.com/auth/callback`
   - Configure Google Cloud Console credentials

#### Disable Email Confirmation (Development Only)
For testing, disable email confirmation:
1. Go to Authentication → Providers → Email
2. Toggle OFF "Confirm email"
3. Save changes

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚢 Deployment

### Deploy to Vercel

#### 1. Install Vercel CLI
```bash
npm i -g vercel
```

#### 2. Login & Deploy
```bash
vercel login
vercel --prod
```

#### 3. Set Environment Variables
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste your Supabase URL

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Paste your anon key
```

#### 4. Update Supabase Redirect URLs
Add your Vercel domain to Supabase:
1. Go to Authentication → URL Configuration
2. Add to "Redirect URLs": `https://your-vercel-domain.vercel.app/auth/callback`
3. Save changes

#### 5. Redeploy
```bash
vercel --prod
```

## 🗂 Project Structure

```
smart-pdf-tools-pro/
├── app/
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts          # OAuth callback handler (server-side)
│   ├── editor/
│   │   └── page.tsx              # Main PDF editor (1900+ lines)
│   ├── login/
│   │   └── page.tsx              # Login/signup page
│   ├── pricing/
│   │   └── page.tsx              # 3-tier pricing page
│   ├── tools/
│   │   └── page.tsx              # Tools listing page
│   ├── globals.css               # Global styles + PDF text overlay CSS
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/
│   ├── editor/
│   │   ├── EditorIconButton.tsx  # Toolbar button with lock badge
│   │   ├── EditorToolbar.tsx     # Main toolbar with tool groups
│   │   └── PremiumModal.tsx      # Upgrade CTA modal
│   ├── ContactSalesModal.tsx     # Business tier contact form
│   └── Header.tsx                # Site header with auth
├── lib/
│   ├── editor/
│   │   └── types.ts              # TypeScript types for editor
│   └── supabase/
│       ├── client.ts             # Browser Supabase client
│       └── server.ts             # Server Supabase client
├── supabase-setup.sql            # Initial database schema
├── supabase-tier-migration.sql   # 3-tier system migration
├── .env.local                    # Environment variables (local)
├── .gitignore                    # Git ignore rules
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🔑 Key Files Explained

### `/app/editor/page.tsx`
Main PDF editor with all editing features:
- PDF.js rendering with text overlay extraction
- Drag-and-drop for text/image/signature layers
- Undo/redo history using refs
- Keyboard shortcuts (Del, Esc, Ctrl+Z/Y)
- Export to PDF using pdf-lib
- Premium feature gating based on user tier

### `/lib/supabase/client.ts` & `/lib/supabase/server.ts`
Supabase client wrappers:
- `client.ts`: Browser-side auth (login page)
- `server.ts`: Server-side auth (OAuth callback, API routes)

### `/supabase-setup.sql`
Creates `profiles` table:
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'business')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `/supabase-tier-migration.sql`
Migrates from boolean `is_premium` to 3-tier system.

## 🎨 Customization

### Change Pricing
Edit `/app/pricing/page.tsx` → `TIERS` array:
```typescript
{
  id: "pro",
  price: "₹499",
  yearlyPrice: "₹4,999 / year",
  features: [...]
}
```

### Add New PDF Features
Edit `/app/editor/page.tsx`:
1. Add tool to `ActiveTool` type
2. Create handler function
3. Add button to `EditorToolbar`
4. Implement export logic in `exportPdfDoc()`

### Modify Color Scheme
Edit `tailwind.config.ts` or use Tailwind classes:
- Primary: `indigo-600` → `blue-600`
- Secondary: `violet-600` → `purple-600`
- Accent: `amber-500` → `orange-500`

## 📊 Database Schema

### `profiles` Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Foreign key to `auth.users.id` |
| `email` | TEXT | User email (auto-populated) |
| `tier` | TEXT | User tier: 'free', 'pro', or 'business' |
| `created_at` | TIMESTAMPTZ | Account creation timestamp |

### Row Level Security (RLS)
- **SELECT**: Users can only read their own profile
- **INSERT**: Auto-created via trigger on signup
- **UPDATE**: Users can update their own profile

## 🔐 Security Best Practices

1. **Environment Variables**: Never commit `.env.local` to Git
2. **Supabase Keys**: Use anon key (public), never service role key
3. **RLS Policies**: All tables have RLS enabled
4. **OAuth**: Use HTTPS in production for callback URLs
5. **API Routes**: Use server-side Supabase client for auth checks

## 🐛 Troubleshooting

### Issue: "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js @supabase/ssr
```

### Issue: OAuth callback fails
1. Check Supabase redirect URLs include your domain
2. Use server client in `/app/auth/callback/route.ts`
3. Verify Google OAuth credentials

### Issue: "Email not confirmed"
- Disable email confirmation in Supabase (Auth → Providers → Email)
- Or manually confirm users in Supabase dashboard

### Issue: Vercel deployment fails
```bash
# Check build locally first
npm run build

# Verify env vars are set
vercel env ls
```

### Issue: PDF rendering is slow
- PDFs are rendered client-side; large files (100+ pages) may take time
- Thumbnails are generated in batches of 10
- Consider implementing server-side rendering for huge files

## 🚀 Future Enhancements

### High Priority (< 1 week)
- [ ] Saved signature library (4 hours)
- [ ] PDF compression (6 hours)
- [ ] Usage tracking dashboard (3 hours)
- [ ] Recent files list (4 hours)

### Medium Priority (2-3 weeks)
- [ ] OCR for scanned PDFs (Tesseract.js)
- [ ] Bulk page operations
- [ ] Template library
- [ ] Export to images (PNG/JPG)
- [ ] Dark mode

### Long-term (1-3 months)
- [ ] AI-powered text replacement (OpenAI API)
- [ ] PDF to Word/Excel conversion
- [ ] Team collaboration (real-time editing)
- [ ] Mobile app (React Native)
- [ ] Workflow automation

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

**Developer**: Shubham Singh  
**Email**: shubham10a50@gmail.com  
**Phone**: +91 6232627062  
**WhatsApp**: [Chat on WhatsApp](https://wa.me/916232627062)

## 🙏 Acknowledgments

- [PDF.js](https://mozilla.github.io/pdf.js/) - Mozilla's PDF rendering library
- [pdf-lib](https://pdf-lib.js.org/) - PDF creation and modification
- [Supabase](https://supabase.com/) - Backend as a Service
- [Vercel](https://vercel.com/) - Deployment platform
- [Next.js](https://nextjs.org/) - React framework

---

**Built with ❤️ by sTechnoWizards**

⭐ Star this repo if you find it useful!
