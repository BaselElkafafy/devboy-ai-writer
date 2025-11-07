import { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';

export default function AdCopyTool() {
  const [formData, setFormData] = useState({
    product: '',
    benefit: '',
    audience: '',
    platform: 'facebook',
    tone: 'modern',
    language: 'english'
  });

  const [output, setOutput] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateAdCopy = () => {
    if (!formData.product || !formData.benefit) return;

    setLoading(true);
    setTimeout(() => {
      const isArabic = formData.language === 'arabic';

      let primaryTexts: string[];
      let hooks: string[];
      let headlines: string[];
      let ctas: string[];

      if (isArabic) {
        primaryTexts = [
          `اكتشف ${formData.product} - ${formData.benefit}. ${formData.audience ? `مثالي ل${formData.audience}` : 'مصمم لمن يقدر الجودة'}. كمية محدودة.`,
          `${formData.benefit}. هذا ما يقدمه ${formData.product}. ${formData.audience ? `صنع ل${formData.audience}` : 'لمن لا يقبل بالاقل'}.`,
          `غير تجربتك مع ${formData.product}. ${formData.benefit}. ${formData.audience ? `موثوق من ${formData.audience}` : 'موثوق من الالاف'}.`
        ];

        hooks = [
          `جاهز ل${formData.benefit}؟`,
          `ماذا لو استطعت ${formData.benefit}؟`,
          `${formData.audience ? formData.audience + ' يستحق' : 'تستحق'} الافضل`,
          `توقف عن القبول بالاقل`,
          `هذا يغير كل شيء`
        ];

        headlines = [
          formData.product,
          `${formData.product} - ${formData.benefit}`,
          `${formData.product} المميز`
        ];

        ctas = [
          'تسوق الان',
          'اكتشف المزيد',
          'احصل عليه اليوم',
          'عرض لفترة محدودة',
          'اعرف المزيد'
        ];
      } else {
        primaryTexts = [
          `Discover ${formData.product} - ${formData.benefit}. ${formData.audience ? `Perfect for ${formData.audience}` : 'Designed for those who value quality'}. Limited availability.`,
          `${formData.benefit}. That's what ${formData.product} delivers. ${formData.audience ? `Made for ${formData.audience} who` : 'For those who'} refuse to compromise on quality.`,
          `Transform your experience with ${formData.product}. ${formData.benefit}. ${formData.audience ? `Trusted by ${formData.audience}` : 'Trusted by thousands'} worldwide.`
        ];

        hooks = [
          `Ready to ${formData.benefit.toLowerCase()}?`,
          `What if you could ${formData.benefit.toLowerCase()}?`,
          `${formData.audience ? formData.audience + ' deserve' : 'You deserve'} better`,
          `Stop settling for less`,
          `This changes everything`
        ];

        headlines = [
          formData.product,
          `${formData.product} - ${formData.benefit}`,
          `Premium ${formData.product}`
        ];

        ctas = [
          'Shop Now',
          'Discover More',
          'Get Yours Today',
          'Limited Time Offer',
          'Learn More'
        ];
      }

      setOutput({
        primaryTexts,
        hooks,
        headlines,
        ctas
      });
      setLoading(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    if (!output) return;
    const text = `PRIMARY AD TEXTS:\n${output.primaryTexts.map((t: string, i: number) => `${i + 1}. ${t}`).join('\n\n')}\n\nHOOKS:\n${output.hooks.map((h: string) => `• ${h}`).join('\n')}\n\nHEADLINES:\n${output.headlines.map((h: string) => `• ${h}`).join('\n')}\n\nCTAs:\n${output.ctas.map((c: string) => `• ${c}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold" style={{ color: '#2B1C06' }}>
          Ad Copy Generator
        </h2>
        <p style={{ color: '#73480C' }}>
          Create compelling ad copy that drives engagement and conversions
        </p>
      </div>

      <div className="p-8 rounded-2xl space-y-6" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block font-medium" style={{ color: '#2B1C06' }}>
              Product Name *
            </label>
            <input
              type="text"
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
              style={{ borderColor: '#73480C40', color: '#2B1C06' }}
              placeholder="e.g., Luxury Skincare Set"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium" style={{ color: '#2B1C06' }}>
              Key Benefit *
            </label>
            <input
              type="text"
              value={formData.benefit}
              onChange={(e) => setFormData({ ...formData, benefit: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
              style={{ borderColor: '#73480C40', color: '#2B1C06' }}
              placeholder="e.g., Glowing skin in just 7 days"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium" style={{ color: '#2B1C06' }}>
              Target Audience
            </label>
            <input
              type="text"
              value={formData.audience}
              onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
              style={{ borderColor: '#73480C40', color: '#2B1C06' }}
              placeholder="e.g., busy professionals, beauty enthusiasts"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium" style={{ color: '#2B1C06' }}>
              Platform
            </label>
            <select
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
              style={{ borderColor: '#73480C40', color: '#2B1C06' }}
            >
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
            </select>
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
              <option value="bold">Bold & Confident</option>
            </select>
          </div>

          <div className="space-y-2">
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
          onClick={generateAdCopy}
          disabled={!formData.product || !formData.benefit || loading}
          className="w-full py-4 rounded-lg font-medium transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
          style={{
            backgroundColor: '#73480C',
            color: '#FCFAE9'
          }}
        >
          <Sparkles size={20} />
          {loading ? 'Crafting your ad copy...' : 'Generate Ad Copy'}
        </button>
      </div>

      {output && (
        <div className="p-8 rounded-2xl space-y-6" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold" style={{ color: '#2B1C06' }}>
              Your Ad Copy Suite
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
              <h4 className="font-bold mb-3" style={{ color: '#73480C' }}>
                Primary Ad Texts
              </h4>
              <div className="space-y-4">
                {output.primaryTexts.map((text: string, idx: number) => (
                  <div key={idx} className="p-4 rounded-lg" style={{ backgroundColor: '#FCFAE9' }}>
                    <p className="font-medium mb-1" style={{ color: '#73480C' }}>Version {idx + 1}</p>
                    <p style={{ color: '#2B1C06' }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-3" style={{ color: '#73480C' }}>
                Hooks
              </h4>
              <ul className="space-y-2">
                {output.hooks.map((hook: string, idx: number) => (
                  <li key={idx} className="flex gap-2" style={{ color: '#2B1C06' }}>
                    <span>•</span>
                    <span>{hook}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3" style={{ color: '#73480C' }}>
                Headlines
              </h4>
              <ul className="space-y-2">
                {output.headlines.map((headline: string, idx: number) => (
                  <li key={idx} className="flex gap-2" style={{ color: '#2B1C06' }}>
                    <span>•</span>
                    <span>{headline}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3" style={{ color: '#73480C' }}>
                Call-to-Actions
              </h4>
              <div className="flex flex-wrap gap-3">
                {output.ctas.map((cta: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-lg font-medium"
                    style={{ backgroundColor: '#73480C', color: '#FCFAE9' }}
                  >
                    {cta}
                  </span>
                ))}
              </div>
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
