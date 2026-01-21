
import React, { useState, useEffect } from 'react';
import { Product, PromptTemplate } from './types';

const EXCHANGE_RATE_MOCK = 1350;
const SHIPPING_BASE = 15000; // Average international shipping cost in KRW

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'builder' | 'inventory' | 'calculator'>('home');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  
  // Calculator State
  const [calcData, setCalcData] = useState({ usd: 100, weight: 1.5, marginPercent: 30 });
  const [results, setResults] = useState({ landed: 0, final: 0, profit: 0 });

  useEffect(() => {
    const landedCost = (calcData.usd * EXCHANGE_RATE_MOCK) + (calcData.weight * 8000) + (calcData.usd > 150 ? (calcData.usd * EXCHANGE_RATE_MOCK * 0.18) : 0);
    const finalPrice = landedCost * (1 + calcData.marginPercent / 100);
    setResults({
      landed: Math.round(landedCost),
      final: Math.round(finalPrice / 100) * 100,
      profit: Math.round(finalPrice - landedCost)
    });
  }, [calcData]);

  const [builderData, setBuilderData] = useState<PromptTemplate>({
    role: "네이버 스마트스토어 전문 구매대행 MD",
    goal: "해외 쇼핑몰의 원본 상품 데이터를 분석하여 국내 정서에 맞는 프리미엄 상세페이지와 SEO 키워드를 생성하라.",
    rules: "- 번역체 지양: '너의 삶을 풍요롭게' 대신 '일상의 질을 높여주는' 등 자연스러운 한국어 사용\n- 국내 검색 최적화: 쿠팡/네이버 인기 키워드 상위 5개를 제목 전면에 배치\n- 신뢰도 강화: 관부가세 포함 여부 및 개인통관고유부호 필요 안내 문구 포함\n- 마진 방어: 소싱 가격 대비 1.5배 이상의 가치가 느껴지도록 스토리텔링",
    structure: "1. [SEO 최적화 상품명]\n2. [감성 소구 카피 (3문장)]\n3. [상세 스펙 한글화 테이블]\n4. [배송 가이드: 현지 배송-항공-통관-국내 배송]\n5. [연관 검색 태그 10개]"
  });

  const handleGenerateFullPrompt = () => {
    const full = `
# [SYSTEM ROLE]: ${builderData.role}
# [GOAL]: ${builderData.goal}

# [OPERATIONAL RULES]:
${builderData.rules}

# [OUTPUT FORMAT]:
${builderData.structure}

# [TARGET PRODUCT DATA]:
(여기에 크롤링한 상품명, 원문 설명, 가격 등의 데이터를 붙여넣으세요)
    `.trim();
    setGeneratedPrompt(full);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-blue-100">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 px-8 py-5 flex justify-between items-center">
        <div className="flex items-center gap-12">
          <h1 className="text-xl font-black tracking-tighter text-blue-900 flex items-center gap-2">
            <div className="w-2 h-8 bg-blue-600"></div>
            GLOBAL SOURCE HUB
          </h1>
          <nav className="hidden lg:flex gap-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
            <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-blue-600' : 'hover:text-slate-900 transition-colors'}>Overview</button>
            <button onClick={() => setActiveTab('builder')} className={activeTab === 'builder' ? 'text-blue-600' : 'hover:text-slate-900 transition-colors'}>AI Listing Center</button>
            <button onClick={() => setActiveTab('inventory')} className={activeTab === 'inventory' ? 'text-blue-600' : 'hover:text-slate-900 transition-colors'}>Product Sourcing</button>
            <button onClick={() => setActiveTab('calculator')} className={activeTab === 'calculator' ? 'text-blue-600' : 'hover:text-slate-900 transition-colors'}>Margin Simulator</button>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-[10px] font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-600">
            LIVE USD/KRW: <span className="text-blue-600">{EXCHANGE_RATE_MOCK}</span>
          </div>
          <button className="text-[11px] font-black tracking-widest border-b-2 border-black pb-0.5">DASHBOARD</button>
        </div>
      </header>

      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative h-[75vh] flex flex-col items-center justify-center text-white px-6 overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/outsourcingEcumers/main.mp4" type="video/mp4" />
              </video>


              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative max-w-4xl text-center space-y-6 z-10">
                <span className="text-xs font-black tracking-[0.3em] uppercase opacity-70">Next-Gen Cross-Border Commerce</span>
                <h2 className="text-5xl md:text-7xl font-light leading-tight">글로벌 소싱의<br/><span className="font-bold">새로운 표준</span></h2>
                <p className="text-lg font-light opacity-60 max-w-2xl mx-auto leading-relaxed">
                  재고 리스크 없는 해외 구매대행 비즈니스를 시작하세요. <br/>
                  AI가 분석하고, 알고리즘이 가격을 결정하며, 당신은 시장을 지배합니다.
                </p>
                <div className="pt-8">
                  <button onClick={() => setActiveTab('builder')} className="bg-white text-blue-900 px-10 py-4 font-black text-xs tracking-widest hover:bg-blue-50 transition-all active:scale-95 shadow-2xl">
                    GET STARTED NOW
                  </button>
                </div>
              </div>
            </section>

            {/* Core Workflow (Image reference style) */}
            <section className="grid grid-cols-1 md:grid-cols-4 h-auto md:h-[400px]">
              <WorkflowStep icon="fa-search" title="Product Discovery" desc="해외 유망 브랜드 발굴" img="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&q=80&w=500" />
              <WorkflowStep icon="fa-wand-magic-sparkles" title="AI Localization" desc="국내 마켓 최적화 리스팅" img="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=500" />
              <WorkflowStep icon="fa-calculator" title="Dynamic Pricing" desc="실시간 마진/관세 계산" img="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=500" />
              <WorkflowStep icon="fa-truck-arrow-right" title="Smart Logistics" desc="해외 배송 추적 및 관리" img="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&q=80&w=500" />
            </section>

            {/* Business Intelligence Section */}
            <section className="py-32 bg-slate-50 flex flex-col items-center px-8">
               <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                  <div className="space-y-8">
                    <span className="text-xs font-black text-blue-600 tracking-widest">WHY US</span>
                    <h3 className="text-4xl font-bold leading-tight">데이터로 증명하는<br/>구매대행 수익 모델</h3>
                    <p className="text-slate-500 leading-relaxed font-light">
                      우리는 단순한 리셀링을 넘어섭니다. 소싱 원가, 항공 운송료, 관세법인 수수료, 마켓 플랫폼 수수료를 정밀하게 시뮬레이션하여 1원 단위의 오차 없이 예상 수익을 산출합니다.
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-3xl font-black text-slate-900">32%</p>
                        <p className="text-xs font-bold text-slate-400 mt-1 uppercase">Avg. Margin Rate</p>
                      </div>
                      <div>
                        <p className="text-3xl font-black text-slate-900">2,400+</p>
                        <p className="text-xs font-bold text-slate-400 mt-1 uppercase">Daily Source Data</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-blue-100 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800" className="relative rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
               </div>
            </section>
          </>
        )}

        {/* Builder Interface */}
        {activeTab === 'builder' && (
          <section className="max-w-7xl mx-auto py-20 px-8">
            <div className="flex flex-col md:flex-row gap-px bg-slate-100 border border-slate-100">
              <div className="bg-white p-12 md:w-1/2 space-y-10">
                <header>
                  <h2 className="text-3xl font-black mb-2">AI Listing Studio</h2>
                  <p className="text-sm text-slate-400">네이버 스마트스토어 전용 상품 가공 엔진</p>
                </header>
                <div className="space-y-6">
                  <InputGroup label="Expert Persona" value={builderData.role} onChange={e => setBuilderData({...builderData, role: e.target.value})} />
                  <InputGroup label="Listing Goal" value={builderData.goal} onChange={e => setBuilderData({...builderData, goal: e.target.value})} />
                  <TextAreaGroup label="Constraints & Strategy" value={builderData.rules} onChange={e => setBuilderData({...builderData, rules: e.target.value})} />
                  <TextAreaGroup label="Output Blueprint" value={builderData.structure} onChange={e => setBuilderData({...builderData, structure: e.target.value})} />
                </div>
                <button 
                  onClick={handleGenerateFullPrompt}
                  className="w-full bg-slate-900 text-white py-4 font-black text-xs tracking-widest hover:bg-blue-600 transition-all"
                >
                  CONSTRUCT PROMPT
                </button>
              </div>
              <div className="bg-slate-50 p-12 md:w-1/2">
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">System Output</span>
                    {generatedPrompt && <button onClick={() => {navigator.clipboard.writeText(generatedPrompt); alert("Copied!");}} className="text-[10px] font-black border-b border-black">COPY ALL</button>}
                  </div>
                  <div className="flex-1 bg-white border border-slate-200 p-8 shadow-inner overflow-y-auto max-h-[600px]">
                    {generatedPrompt ? (
                      <pre className="text-sm font-mono whitespace-pre-wrap text-slate-700 leading-relaxed">
                        {generatedPrompt}
                      </pre>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-30 italic">
                        <i className="fas fa-brain text-4xl mb-4"></i>
                        <p>설정을 입력하고 버튼을 클릭하면<br/>최적화된 프롬프트가 여기에 생성됩니다.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Calculator Interface */}
        {activeTab === 'calculator' && (
          <section className="max-w-4xl mx-auto py-24 px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h2 className="text-3xl font-black tracking-tighter">Profit Simulation</h2>
                <div className="space-y-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Source Price (USD)</label>
                     <input type="number" className="w-full border-b-2 border-slate-200 py-3 text-2xl font-black focus:border-blue-600 outline-none transition-colors" value={calcData.usd} onChange={e => setCalcData({...calcData, usd: Number(e.target.value)})} />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Weight (KG)</label>
                     <input type="number" className="w-full border-b-2 border-slate-200 py-3 text-2xl font-black focus:border-blue-600 outline-none transition-colors" value={calcData.weight} onChange={e => setCalcData({...calcData, weight: Number(e.target.value)})} />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Margin (%)</label>
                     <input type="number" className="w-full border-b-2 border-slate-200 py-3 text-2xl font-black focus:border-blue-600 outline-none transition-colors" value={calcData.marginPercent} onChange={e => setCalcData({...calcData, marginPercent: Number(e.target.value)})} />
                   </div>
                </div>
              </div>
              <div className="bg-slate-900 p-10 text-white flex flex-col justify-between rounded-sm">
                <div className="space-y-8">
                  <div className="pb-6 border-b border-slate-800">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Estimated Landed Cost</p>
                    <p className="text-3xl font-light italic">₩{results.landed.toLocaleString()}</p>
                  </div>
                  <div className="pb-6 border-b border-slate-800">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Recommended List Price</p>
                    <p className="text-5xl font-black text-blue-400">₩{results.final.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Expected Net Profit</p>
                    <p className="text-3xl font-black text-green-400">₩{results.profit.toLocaleString()}</p>
                  </div>
                </div>
                <div className="pt-10 text-[9px] text-slate-500 leading-relaxed font-bold uppercase">
                  * Includes: FX conversion, Shipping (Est.), Duties (if &gt;$150).<br/>
                  * Excludes: Marketplace Commission, Domestic Return Insurance.
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Inventory View */}
        {activeTab === 'inventory' && (
          <section className="max-w-7xl mx-auto py-24 px-8">
            <header className="flex justify-between items-end mb-16 border-b pb-8">
              <div>
                <h2 className="text-4xl font-light">Sourcing Pipeline</h2>
                <p className="text-sm text-slate-400 mt-2 font-bold uppercase tracking-tighter">Real-time Global Inventory Sync</p>
              </div>
              <div className="flex gap-4">
                 <button className="text-[10px] font-black border border-black px-8 py-3 hover:bg-black hover:text-white transition-all">IMPORT FROM URL</button>
                 <button className="text-[10px] font-black bg-blue-900 text-white px-8 py-3 shadow-xl">PUBLISH ALL</button>
              </div>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <ProductRow name="Mechanical Gaming Keyboard" brand="Razer" cost="$129.99" img="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=400" />
               <ProductRow name="Ergonomic Workstation Chair" brand="Herman Miller" cost="$899.00" img="https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=400" />
               <ProductRow name="Ultra-Light Camping Tent" brand="Naturehike" cost="$145.50" img="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=400" />
               <ProductRow name="Pro Studio Microphone" brand="Shure" cost="$399.00" img="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=400" />
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-16 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6">
             <h1 className="text-2xl font-black text-blue-900">GLOBAL SOURCE HUB</h1>
             <p className="max-w-xs text-[11px] font-bold text-slate-400 leading-loose uppercase tracking-widest">
               AI-Driven Global Commerce Solutions for Professional Sellers.
             </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <FooterSection title="Platform" links={['Sourcing API', 'AI Listing', 'Logistics Node', 'Margin Sim']} />
            <FooterSection title="Company" links={['Our Vision', 'Partners', 'Careers', 'Contact']} />
            <FooterSection title="Network" links={['Amazon', 'eBay', 'AliExpress', 'Naver']} />
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-100 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <p>© 2024 GLOBAL SOURCE HUB. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <i className="fab fa-linkedin-in hover:text-blue-600 cursor-pointer"></i>
            <i className="fab fa-twitter hover:text-blue-400 cursor-pointer"></i>
            <i className="fab fa-instagram hover:text-pink-500 cursor-pointer"></i>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Internal Components
const WorkflowStep = ({ icon, title, desc, img }: { icon: string, title: string, desc: string, img: string }) => (
  <div className="relative group overflow-hidden h-full">
    <img src={img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500"></div>
    <div className="relative h-full p-10 flex flex-col justify-end text-white space-y-2">
      <i className={`fas ${icon} text-xl mb-4 opacity-70`}></i>
      <h4 className="text-xl font-bold">{title}</h4>
      <p className="text-xs font-light opacity-60">{desc}</p>
      <div className="w-6 h-1 bg-blue-500 mt-4 group-hover:w-full transition-all duration-700"></div>
    </div>
  </div>
);

const ProductRow = ({ name, brand, cost, img }: { name: string, brand: string, cost: string, img: string }) => (
  <div className="flex items-center gap-8 bg-white border p-6 hover:shadow-2xl transition-all cursor-pointer group">
    <img src={img} className="w-32 h-32 object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all duration-500" />
    <div className="flex-1 space-y-1">
      <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{brand}</p>
      <h4 className="text-lg font-bold group-hover:text-blue-600 transition-colors">{name}</h4>
      <div className="flex gap-6 pt-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase">Cost: {cost}</span>
        <span className="text-[11px] font-bold text-green-600 uppercase">Market OK</span>
      </div>
    </div>
    <button className="text-[10px] font-black border-b-2 border-slate-200 group-hover:border-blue-600 pb-1 transition-all">PROCESS</button>
  </div>
);

const FooterSection = ({ title, links }: { title: string, links: string[] }) => (
  <div className="space-y-4">
    <h5 className="text-[11px] font-black text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-2">{title}</h5>
    <ul className="space-y-2">
      {links.map(link => (
        <li key={link} className="text-[10px] font-bold text-slate-400 hover:text-blue-600 cursor-pointer uppercase transition-colors">{link}</li>
      ))}
    </ul>
  </div>
);

const InputGroup = ({ label, value, onChange }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
    <input 
      type="text" 
      className="w-full border-b border-slate-200 py-2 focus:border-blue-600 focus:outline-none text-sm font-bold transition-colors"
      value={value}
      onChange={onChange}
    />
  </div>
);

const TextAreaGroup = ({ label, value, onChange }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
    <textarea 
      rows={3}
      className="w-full border border-slate-200 p-4 focus:border-blue-600 focus:outline-none text-sm font-bold transition-colors bg-slate-50/50"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default App;
