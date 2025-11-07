import { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';

export default function EmailWriterTool() {
  const [formData, setFormData] = useState({
    flowType: 'abandoned-cart',
    offer: '',
    language: 'english',
    template: 'simple'
  });

  const [output, setOutput] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateEmail = () => {
    setLoading(true);
    setTimeout(() => {
      let subject = '';
      let preview = '';
      let greeting = '';
      let body = '';
      let reminderText = '';
      let cartItems: string[] = [];
      let closingText = '';
      let cta = '';

      const isArabic = formData.language === 'arabic';

      switch (formData.flowType) {
        case 'abandoned-cart':
          if (isArabic) {
            subject = 'لا تزال تفكر فيه؟ في انتظارك ✨';
            preview = 'سلتك محفوظة — الق نظرة قبل ان تنتهي';
            greeting = 'مرحبا {{customer_first_name}}،';
            body = 'لاحظنا انك تركت شيء جميل.\nمنتجاتك المختارة لا تزال تنتظرك — مصممة لتمنحك لمسة الفخامة التي تستحقها.';
            reminderText = 'تذكير لطيف قبل انتهاء صلاحية سلتك:';
            cartItems = [
              'طقم قطن مميز — ملمس ناعم، لون كريمي طبيعي',
              'كوب سيراميك صنع يدوي — طلاء مطفي ناعم',
              'شمعة عطرية ذهبية — رائحة فانيليا خفيفة'
            ];
            closingText = 'دلل نفسك — مجموعتك المثالية على بعد نقرة واحدة.';
            cta = 'اكمل الطلب';
          } else {
            subject = 'Still thinking about it? It\'s waiting for you ✨';
            preview = 'Your cart is saved — take another look before it\'s gone.';
            greeting = 'Hi {{customer_first_name}},';
            body = 'We noticed you left something beautiful behind.\nYour selected items are still waiting — crafted to bring that touch of luxury you deserve.';
            reminderText = 'Here\'s a gentle reminder before your cart expires:';
            cartItems = [
              'Premium Cotton Set — soft finish, natural cream tone',
              'Handmade Ceramic Cup — smooth matte glaze',
              'Golden Aroma Candle — subtle vanilla scent'
            ];
            closingText = 'Treat yourself — your perfect collection is only a click away.';
            cta = 'Complete Your Order';
          }
          break;
        case 'post-purchase':
          if (isArabic) {
            subject = 'طلبك في الطريق 🚀';
            preview = 'تتبع التوصيل';
            greeting = 'مرحبا {{customer_first_name}}،';
            body = 'شكرا لك على الطلب!\nنحن نجهز منتجاتك بعناية للشحن.';
            reminderText = 'تفاصيل طلبك:';
            cartItems = [
              'شحن الطلب خلال 24-48 ساعة',
              'تتبع الطرد مباشرة',
              'ارجاع مجاني اذا لزم الامر',
              'خصم 10٪ على الطلب القادم'
            ];
            closingText = 'نتمنى ان تستمتع بمشترياتك!';
            cta = 'تتبع الطلب';
          } else {
            subject = 'Your order is on its way! 🚀';
            preview = 'Track your delivery and enjoy your purchase';
            greeting = 'Hi {{customer_first_name}},';
            body = 'Thank you for your order!\nWe\'re carefully preparing your items for delivery.';
            reminderText = 'Your order details:';
            cartItems = [
              'Your order will ship within 24-48 hours',
              'Track your package in real-time',
              'Enjoy free returns if needed',
              'Get 10% off your next purchase'
            ];
            closingText = 'We hope you enjoy your purchase!';
            cta = 'Track Your Order';
          }
          break;
        case 'review-request':
          if (isArabic) {
            subject = 'كيف كانت تجربتك؟ ⭐';
            preview = 'شارك رأيك';
            greeting = 'مرحبا {{customer_first_name}}،';
            body = 'نتمنى انك استمتعت بمشترياتك!\nرأيلك يساعدنا على التحسين.';
            reminderText = 'لماذا التقييم مهم:';
            cartItems = [
              'تقييم سريع دقيقتين',
              'شارك صور المنتج',
              'ساعد العملاء الاخرين',
              'احصل على عروض خاصة'
            ];
            closingText = 'شكرا لوقتك!';
            cta = 'اترك تقييم';
          } else {
            subject = 'How are you enjoying your purchase? ⭐';
            preview = 'Share your thoughts and help others discover';
            greeting = 'Hi {{customer_first_name}},';
            body = 'We hope you\'re loving your recent purchase!\nYour feedback helps us improve and helps other customers make confident decisions.';
            reminderText = 'Why your review matters:';
            cartItems = [
              'Quick 2-minute review process',
              'Share photos of your purchase',
              'Help other customers decide',
              'Get early access to new products'
            ];
            closingText = 'Thank you for your time!';
            cta = 'Leave a Review';
          }
          break;
        case 'win-back':
          if (isArabic) {
            subject = 'نفتقدك - عرض خاص 🎁';
            preview = 'عرض حصري لك';
            greeting = 'مرحبا {{customer_first_name}}،';
            body = 'مر وقت طويل منذ زيارتك.\nنحب نشوفك مرة ثانية.';
            reminderText = 'عرض حصري لك:';
            cartItems = [
              formData.offer || 'خصم 20٪ على الطلب القادم',
              'شحن مجاني على كل الطلبات',
              'منتجات جديدة رائعة',
              'عروض حصرية مبكرة'
            ];
            closingText = 'نتطلع لرؤيتك مرة اخرى!';
            cta = 'تسوق الان';
          } else {
            subject = 'We miss you - here\'s something special 🎁';
            preview = 'Exclusive offer just for you';
            greeting = 'Hi {{customer_first_name}},';
            body = 'It\'s been a while since your last visit.\nWe\'d love to welcome you back.';
            reminderText = 'Here\'s an exclusive offer for you:';
            cartItems = [
              formData.offer || '20% off your next order',
              'Free shipping on all orders',
              'New arrivals you\'ll love',
              'Exclusive early access to sales'
            ];
            closingText = 'We look forward to seeing you again!';
            cta = 'Shop Now';
          }
          break;
      }

      setOutput({
        subject,
        preview,
        greeting,
        body,
        reminderText,
        cartItems,
        closingText,
        cta
      });
      setLoading(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    if (!output) return;
    const text = `Subject: ${output.subject}\nPreview: ${output.preview}\n\n${output.greeting}\n\n${output.body}\n\n${output.reminderText}\n\nYour Cart Highlights:\n${output.cartItems.map((item: string) => `• ${item}`).join('\n')}\n\n${output.closingText}\n\n[${output.cta}]`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold" style={{ color: '#2B1C06' }}>
          Email Writer
        </h2>
        <p style={{ color: '#73480C' }}>
          Craft perfect email campaigns for every customer journey
        </p>
      </div>

      <div className="p-8 rounded-2xl space-y-6" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block font-medium" style={{ color: '#2B1C06' }}>
              Email Type
            </label>
            <select
              value={formData.flowType}
              onChange={(e) => setFormData({ ...formData, flowType: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
              style={{ borderColor: '#73480C40', color: '#2B1C06' }}
            >
              <option value="abandoned-cart">Abandoned Cart</option>
              <option value="post-purchase">Post-Purchase Thank You</option>
              <option value="review-request">Review Request</option>
              <option value="win-back">Win-Back Campaign</option>
            </select>
          </div>

          {formData.flowType === 'win-back' && (
            <div className="space-y-2">
              <label className="block font-medium" style={{ color: '#2B1C06' }}>
                Special Offer (Optional)
              </label>
              <input
                type="text"
                value={formData.offer}
                onChange={(e) => setFormData({ ...formData, offer: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                style={{ borderColor: '#73480C40', color: '#2B1C06' }}
                placeholder="e.g., 20% off your next order"
              />
            </div>
          )}

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

          <div className="space-y-2">
            <label className="block font-medium" style={{ color: '#2B1C06' }}>
              Email Template Style
            </label>
            <select
              value={formData.template}
              onChange={(e) => setFormData({ ...formData, template: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
              style={{ borderColor: '#73480C40', color: '#2B1C06' }}
            >
              <option value="simple">Simple & Clean</option>
              <option value="modern">Modern with Cards</option>
              <option value="minimal">Minimal Text-Only</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateEmail}
          disabled={loading}
          className="w-full py-4 rounded-lg font-medium transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
          style={{
            backgroundColor: '#73480C',
            color: '#FCFAE9'
          }}
        >
          <Sparkles size={20} />
          {loading ? 'Crafting your email...' : 'Generate Email'}
        </button>
      </div>

      {output && (
        <div className="p-8 rounded-2xl space-y-6" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold" style={{ color: '#2B1C06' }}>
              Your Email Template
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

          <div className="space-y-6">
            <div className="p-4 rounded-lg" style={{ backgroundColor: '#FCFAE9' }}>
              <h4 className="font-bold mb-2" style={{ color: '#73480C' }}>
                Subject Line
              </h4>
              <p className="text-lg font-medium" style={{ color: '#2B1C06' }}>
                {output.subject}
              </p>
            </div>

            <div className="p-4 rounded-lg" style={{ backgroundColor: '#FCFAE9' }}>
              <h4 className="font-bold mb-2" style={{ color: '#73480C' }}>
                Preview Text
              </h4>
              <p style={{ color: '#2B1C06' }}>
                {output.preview}
              </p>
            </div>

            {formData.template === 'simple' && (
              <div className="border-2 p-6 rounded-lg" style={{ borderColor: '#73480C20', direction: formData.language === 'arabic' ? 'rtl' : 'ltr' }}>
                <h4 className="font-bold mb-4 text-center" style={{ color: '#73480C' }}>
                  Email Body
                </h4>
                <p className="mb-2 font-medium" style={{ color: '#2B1C06' }}>
                  {output.greeting}
                </p>
                <p className="mb-4 leading-relaxed whitespace-pre-line" style={{ color: '#2B1C06' }}>
                  {output.body}
                </p>
                <p className="mb-3 font-medium" style={{ color: '#73480C' }}>
                  {output.reminderText}
                </p>
                <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: '#FCFAE920' }}>
                  <p className="font-bold mb-2" style={{ color: '#73480C' }}>Your Cart Highlights:</p>
                  <div className="space-y-2">
                    {output.cartItems.map((item: string, idx: number) => (
                      <div key={idx} className="flex gap-2 items-start" style={{ color: '#2B1C06' }}>
                        <span>•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="mb-6 leading-relaxed" style={{ color: '#2B1C06' }}>
                  {output.closingText}
                </p>
                <div className="text-center">
                  <button
                    className="px-8 py-4 rounded-lg font-bold text-lg transition-all hover:opacity-90"
                    style={{ backgroundColor: '#73480C', color: '#FCFAE9' }}
                  >
                    {output.cta}
                  </button>
                </div>
              </div>
            )}

            {formData.template === 'modern' && (
              <div className="p-6 rounded-lg" style={{ backgroundColor: '#FCFAE9', direction: formData.language === 'arabic' ? 'rtl' : 'ltr' }}>
                <h4 className="font-bold mb-4 text-center text-2xl" style={{ color: '#73480C' }}>
                  Email Body
                </h4>
                <div className="bg-white p-6 rounded-lg mb-6">
                  <p className="mb-2 font-medium" style={{ color: '#2B1C06' }}>
                    {output.greeting}
                  </p>
                  <p className="mb-4 leading-relaxed whitespace-pre-line" style={{ color: '#2B1C06' }}>
                    {output.body}
                  </p>
                  <p className="font-medium" style={{ color: '#73480C' }}>
                    {output.reminderText}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {output.cartItems.map((item: string, idx: number) => (
                    <div key={idx} className="bg-white p-4 rounded-lg border-2" style={{ borderColor: '#73480C20' }}>
                      <div className="flex gap-3 items-start" style={{ color: '#2B1C06' }}>
                        <span className="text-2xl">✓</span>
                        <span className="font-medium">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white p-4 rounded-lg mb-6">
                  <p className="leading-relaxed" style={{ color: '#2B1C06' }}>
                    {output.closingText}
                  </p>
                </div>
                <div className="text-center">
                  <button
                    className="px-10 py-5 rounded-xl font-bold text-xl transition-all hover:opacity-90 shadow-lg"
                    style={{ backgroundColor: '#73480C', color: '#FCFAE9' }}
                  >
                    {output.cta}
                  </button>
                </div>
              </div>
            )}

            {formData.template === 'minimal' && (
              <div className="p-6" style={{ direction: formData.language === 'arabic' ? 'rtl' : 'ltr' }}>
                <h4 className="font-bold mb-4" style={{ color: '#73480C' }}>
                  Email Body
                </h4>
                <div className="space-y-4">
                  <p className="font-medium" style={{ color: '#2B1C06' }}>
                    {output.greeting}
                  </p>
                  <p className="leading-relaxed whitespace-pre-line" style={{ color: '#2B1C06' }}>
                    {output.body}
                  </p>
                  <p className="font-medium" style={{ color: '#73480C' }}>
                    {output.reminderText}
                  </p>
                  <div className="space-y-2 pl-4">
                    {output.cartItems.map((item: string, idx: number) => (
                      <p key={idx} style={{ color: '#2B1C06' }}>
                        • {item}
                      </p>
                    ))}
                  </div>
                  <p className="leading-relaxed" style={{ color: '#2B1C06' }}>
                    {output.closingText}
                  </p>
                  <div className="pt-4">
                    <a
                      href="#"
                      className="font-bold underline text-lg"
                      style={{ color: '#73480C' }}
                    >
                      {output.cta} →
                    </a>
                  </div>
                </div>
              </div>
            )}
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
