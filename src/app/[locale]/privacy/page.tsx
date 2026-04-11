export const metadata = {
  title: "Privacy Policy | MojiCap",
  description: "Learn how MojiCap protects your privacy. We process text locally and do not store personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-6 text-muted-foreground">
        <section>
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <p className="mt-4">
            At MojiCap, your privacy is our priority. As a pure utility application, we intentionally avoid collecting personal data wherever possible. This Privacy Policy outlines what information is collected and how it is used.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">1. Local Processing & Storage</h2>
          <p>
            MojiCap is designed as a client-side web application. When you copy emojis, use the text generators, or translate Braille, <strong>all text processing happens locally within your web browser</strong>. We do not transmit your input text or copied content to our servers.
          </p>
          <p>
            We use your browser's Local Storage to save specific preferences (such as your chosen display theme, and your "Recently Used" emojis). This data never leaves your device and is not accessible by us.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">2. Analytics and Tracking</h2>
          <p>
            To understand how our website is performing and discover which tools are most useful to our visitors, we use privacy-friendly web analytics. These analytics platforms only collect standard, anonymous metadata, such as:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Pages visited</li>
            <li>Browser type and operating system</li>
            <li>Referring website</li>
            <li>Non-precise geographic location (e.g., country level)</li>
          </ul>
          <p>
            We do not use tracking tools for advertising profiling or targeted marketing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">3. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites or services that are not owned or controlled by MojiCap. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party websites.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">4. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. Any changes will be reflected on this page with an updated "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">5. Contact Us</h2>
          <p>
            If you have any questions or concerns about our Privacy Policy or data handling practices, please contact us via our main project repository on GitHub.
          </p>
        </section>
      </div>
    </div>
  );
}
