import { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';

export default function ProductDescriptionTool() {
  const [formData, setFormData] = useState({
    title: '',
    features: '',
    materials: '',
    care: '',
    benefits: '',
    tone: 'modern',
    language: 'english'
  });

  const [output, setOutput] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateDescription = () => {
    if (!formData.title) return;

    setLoading(true);
    setTimeout(() => {
      const isArabic = formData.language === 'arabic';

      let bulletPoints: string[];
      let paragraph: string;
      let keywords: string;

      if (isArabic) {
        bulletPoints = [
          formData.features && `مميزات: ${formData.features}`,
          formData.materials && `مصنوع من ${formData.materials}`,
          formData.care && formData.care.split('\n').map(line => line.trim()).filter(Boolean).join(' - '),
          formData.benefits && formData.benefits,
          'جودة عالية',
          'تصميم عصري'
        ].filter(Boolean);

        paragraph = `${formData.title} يجمع بين التصميم العصري والجودة العالية. ${formData.benefits || 'منتج مثالي للاستخدام اليومي'}. ${formData.materials ? `مصنوع من ${formData.materials}، ` : ''}متين ويدوم طويلا. ${formData.care || 'سهل العناية'}.`;

        keywords = `${formData.title}, جودة عالية, ${formData.materials || 'مواد فاخرة'}, تصميم عصري, منتجات يومية`;
      } else {
        const careInstructions = formData.care ? formData.care.split('\n').map(line => line.trim()).filter(Boolean) : [];

        bulletPoints = [
          formData.features && `Premium ${formData.features}`,
          formData.materials && `Crafted from ${formData.materials}`,
          ...careInstructions.map(care => `Care: ${care}`),
          formData.benefits && formData.benefits,
          'Designed for lasting quality',
          'Perfect for everyday elegance'
        ].filter(Boolean);

        paragraph = `${formData.title} brings together timeless design and modern functionality. ${formData.benefits || 'Experience the perfect blend of style and comfort'}. ${formData.materials ? `Made with premium ${formData.materials}, ` : ''}this piece is built to last. ${formData.care ? careInstructions.join('. ') + '.' : 'Easy to care for and maintain.'}`;

        keywords = `${formData.title.toLowerCase()}, premium quality, ${formData.materials || 'luxury materials'}, stylish design, everyday essentials, modern style`;
      }

      setOutput({
        title: formData.title,
        bullets: bulletPoints.slice(0, 8),
        paragraph,
        keywords
      });
      setLoading(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    if (!output) return;
    const text = `${output.title}\n\n${output.bullets.map((b: string) => `• ${b}`).join('\n')}\n\n${output.paragraph}\n\nKeywords: ${output.keywords}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold" style={{ color: '#2B1C06' }}>
          Product Description Pro
        </h2>
        <p style={{ color: '#73480C' }}>
          Create SEO-optimized descriptions that convert browsers into buyers
        </p>
      </div>

      <div className="p-8 rounded-2xl space-y-6" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block font-medium" style={{ color: '#2B1C06' }}>
              Product Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-50"
              style={{ borderColor: '#73480C40', color: '#2B1C06' }}
              placeholder="e.g., Luxury Leather Handbag"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium" style={{ color: '#2B1C06' }}>
              Key Features
            </label>
            <input
              type="text"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
              style={{ borderColor: '#73480C40', color: '#2B1C06' }}
              placeholder="e.g., handcrafted design, multiple compartments"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium" style={{ color: '#2B1C06' }}>
              Materials
            </label>
            <input
              type="text"
              value={formData.materials}
              onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
              style={{ borderColor: '#73480C40', color: '#2B1C06' }}
              placeholder="e.g., genuine Italian leather"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium" style={{ color: '#2B1C06' }}>
              Care Instructions
            </label>
            <textarea
              value={formData.care}
              onChange={(e) => setFormData({ ...formData, care: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none resize-none"
              style={{ borderColor: '#73480C40', color: '#2B1C06' }}
              placeholder="e.g., wipe clean with soft cloth&#10;machine washable&#10;avoid direct sunlight"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium" style={{ color: '#2B1C06' }}>
              Key Benefits
            </label>
            <input
              type="text"
              value={formData.benefits}
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
              style={{ borderColor: '#73480C40', color: '#2B1C06' }}
              placeholder="e.g., elevates any outfit"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium" style={{ color: '#2B1C06' }}>
              Tone
            </label>
            <select
              value={formData.tone}
              onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
              style={{ borderColor: '#73480C40', color: '#2B1C06' }}
            >
              <option value="modern">Modern & Clear</option>
              <option value="luxury">Luxury & Premium</option>
              <option value="casual">Casual & Friendly</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block font-medium" style={{ color: '#2B1C06' }}>
              Language
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="english"
                  checked={formData.language === 'english'}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  style={{ accentColor: '#73480C' }}
                />
                <span style={{ color: '#2B1C06' }}>English</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="arabic"
                  checked={formData.language === 'arabic'}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  style={{ accentColor: '#73480C' }}
                />
                <span style={{ color: '#2B1C06' }}>Arabic</span>
              </label>
            </div>
          </div>
        </div>

        <button
          onClick={generateDescription}
          disabled={!formData.title || loading}
          className="w-full py-4 rounded-lg font-medium transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
          style={{
            backgroundColor: '#73480C',
            color: '#FCFAE9'
          }}
        >
          <Sparkles size={20} />
          {loading ? 'Crafting your description...' : 'Generate Description'}
        </button>
      </div>

      {output && (
        <div className="p-8 rounded-2xl space-y-6" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold" style={{ color: '#2B1C06' }}>
              Your Polished Copy
            </h3>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
              style={{ backgroundColor: '#73480C', color: '#FCFAE9' }}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy All'}
            </button>
          </div>

          <div className="space-y-6" style={{ direction: formData.language === 'arabic' ? 'rtl' : 'ltr' }}>
            <div>
              <h4 className="font-bold mb-2" style={{ color: '#73480C' }}>
                Title
              </h4>
              <p className="text-lg" style={{ color: '#2B1C06' }}>
                {output.title}
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-3" style={{ color: '#73480C' }}>
                Key Features
              </h4>
              <ul className="space-y-2">
                {output.bullets.map((bullet: string, idx: number) => (
                  <li key={idx} className="flex gap-2" style={{ color: '#2B1C06' }}>
                    <span>•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2" style={{ color: '#73480C' }}>
                Description
              </h4>
              <p className="leading-relaxed" style={{ color: '#2B1C06' }}>
                {output.paragraph}
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-2" style={{ color: '#73480C' }}>
                SEO Keywords
              </h4>
              <p style={{ color: '#2B1C06' }}>
                {output.keywords}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t space-y-2" style={{ borderColor: '#73480C20' }}>
            <p className="text-center" style={{ color: '#73480C' }}>
              Enjoy this free tool? <a href="https://www.buymeacoffee.com/devboy" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">Buy me a coffee</a> to keep it free for everyone.
            </p>
            <p className="text-center text-sm" style={{ color: '#73480C' }}>
              Having issues? Contact us at <a href="mailto:help@thedevboy.com" className="font-bold hover:underline">help@thedevboy.com</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
