import { useState } from 'react';
import { FileText, Mail, MessageSquare, Sparkles } from 'lucide-react';
import ProductDescriptionTool from './components/ProductDescriptionTool';
import AdCopyTool from './components/AdCopyTool';
import EmailWriterTool from './components/EmailWriterTool';

type Tool = 'product' | 'ad' | 'email';

function App() {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  const tools = [
    {
      id: 'product' as Tool,
      icon: FileText,
      title: 'Product Description Pro',
      description: 'Create SEO-optimized product descriptions that convert'
    },
    {
      id: 'ad' as Tool,
      icon: MessageSquare,
      title: 'Ad Copy Generator',
      description: 'Generate compelling ad copy for social media platforms'
    },
    {
      id: 'email' as Tool,
      icon: Mail,
      title: 'Email Writer',
      description: 'Craft perfect email campaigns for every customer journey'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FCFAE9' }}>
      <header className="border-b" style={{ borderColor: '#73480C20' }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <img
              src="/524481307_18390049540191075_6186243356363864115_n (1).jpg"
              alt="DevBoy"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#2B1C06' }}>
                Shopify AI Assistant
              </h1>
              <p className="text-sm" style={{ color: '#73480C' }}>
                Beautiful content in seconds
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {!activeTool ? (
          <div className="space-y-8">
            <div className="text-center space-y-3 mb-12">
              <div className="flex items-center justify-center gap-2">
                <Sparkles size={28} style={{ color: '#73480C' }} />
                <h2 className="text-3xl font-bold" style={{ color: '#2B1C06' }}>
                  Choose Your Tool
                </h2>
              </div>
              <p className="text-lg" style={{ color: '#73480C' }}>
                Generate conversion-focused content in English or Arabic
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTool(tool.id)}
                    className="group p-8 rounded-2xl text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(115, 72, 12, 0.1)',
                    }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                         style={{ background: 'linear-gradient(135deg, rgba(115, 72, 12, 0.03) 0%, rgba(252, 250, 233, 0.5) 100%)' }} />

                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                           style={{ backgroundColor: 'rgba(115, 72, 12, 0.08)' }}>
                        <Icon size={28} style={{ color: '#73480C' }} />
                      </div>

                      <h3 className="text-xl font-bold mb-3 transition-colors duration-300"
                          style={{ color: '#2B1C06' }}>
                        {tool.title}
                      </h3>

                      <p className="text-sm leading-relaxed" style={{ color: '#73480C' }}>
                        {tool.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setActiveTool(null)}
              className="mb-6 px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
              style={{
                backgroundColor: '#73480C',
                color: '#FCFAE9'
              }}
            >
              Back to Tools
            </button>

            {activeTool === 'product' && <ProductDescriptionTool />}
            {activeTool === 'ad' && <AdCopyTool />}
            {activeTool === 'email' && <EmailWriterTool />}
          </div>
        )}
      </main>

      <footer className="border-t mt-20" style={{ borderColor: '#73480C20' }}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center space-y-6">
            <p className="text-sm" style={{ color: '#73480C' }}>
              Free forever for the Shopify community
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
