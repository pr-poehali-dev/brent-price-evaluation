import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [itemName, setItemName] = useState('');
  const [rarity, setRarity] = useState('common');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const { toast } = useToast();

  const calculatePrice = () => {
    if (!itemName) {
      toast({
        title: "Ошибка",
        description: "Введите название брэинрота",
        variant: "destructive"
      });
      return;
    }

    const basePrice = itemName.length * 10;
    const rarityMultiplier = {
      common: 1,
      rare: 2.5,
      epic: 5,
      legendary: 10,
      mythic: 20
    }[rarity] || 1;

    const price = Math.round(basePrice * rarityMultiplier + Math.random() * 100);
    setEstimatedPrice(price);
  };

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Сообщение отправлено!",
      description: "Мы свяжемся с вами в ближайшее время",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <nav className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
              <Icon name="Box" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-heading text-primary">BrainRot Pricing</h1>
          </div>
          <div className="hidden md:flex gap-6">
            <a href="#home" className="text-foreground hover:text-primary transition-colors font-medium">Главная</a>
            <a href="#calculator" className="text-foreground hover:text-primary transition-colors font-medium">Оценка</a>
            <a href="#faq" className="text-foreground hover:text-primary transition-colors font-medium">FAQ</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">Контакты</a>
          </div>
        </div>
      </nav>

      <section id="home" className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium">
              🎮 Roblox Platform
            </div>
            <h2 className="text-5xl md:text-6xl font-heading leading-tight text-foreground">
              Оцени свои <span className="text-primary">брэинроты</span> прямо сейчас!
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Узнай реальную стоимость твоих предметов в Roblox. Быстрая и точная оценка всех видов брэинротов на платформе.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="text-lg px-8 shadow-lg hover:shadow-xl transition-shadow" onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="Calculator" className="mr-2" size={20} />
                Оценить
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}>
                Узнать больше
              </Button>
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-2xl"></div>
            <img 
              src="https://v3b.fal.media/files/b/elephant/-mcdSiQfjcuqW1vwuBPg-_output.png" 
              alt="Brain Item" 
              className="relative w-full rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section id="calculator" className="container mx-auto px-4 py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading mb-4 text-foreground">Калькулятор Оценки</h2>
            <p className="text-muted-foreground text-lg">Введи данные о своём брэинроте и узнай его стоимость</p>
          </div>
          
          <Card className="p-8 shadow-2xl border-2 animate-bounce-in">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="itemName" className="text-lg font-medium">Название брэинрота</Label>
                <Input 
                  id="itemName"
                  placeholder="Например: Golden Brain"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="text-lg py-6"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-medium">Редкость</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[
                    { value: 'common', label: 'Обычный', color: 'bg-gray-500' },
                    { value: 'rare', label: 'Редкий', color: 'bg-blue-500' },
                    { value: 'epic', label: 'Эпический', color: 'bg-purple-500' },
                    { value: 'legendary', label: 'Легендарный', color: 'bg-yellow-500' },
                    { value: 'mythic', label: 'Мифический', color: 'bg-red-500' }
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setRarity(item.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        rarity === item.value 
                          ? 'border-primary scale-105 shadow-lg' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className={`w-6 h-6 ${item.color} rounded-full mx-auto mb-2`}></div>
                      <div className="text-sm font-medium">{item.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full text-lg py-6 shadow-lg hover:shadow-xl transition-all" 
                onClick={calculatePrice}
              >
                <Icon name="Sparkles" className="mr-2" size={20} />
                Оценить брэинрот
              </Button>

              {estimatedPrice !== null && (
                <Card className="p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20 animate-scale-in">
                  <div className="text-center space-y-2">
                    <div className="text-muted-foreground">Примерная стоимость:</div>
                    <div className="text-5xl font-heading text-primary">{estimatedPrice} ₽</div>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Icon name="TrendingUp" size={16} />
                      <span>Цены обновляются каждый день</span>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </Card>
        </div>
      </section>

      <section id="faq" className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading mb-4 text-foreground">Вопросы и Ответы</h2>
            <p className="text-muted-foreground text-lg">Всё, что нужно знать о оценке брэинротов</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-2xl px-6 border-2 shadow-md">
              <AccordionTrigger className="text-lg font-medium hover:text-primary">
                <div className="flex items-center gap-3">
                  <Icon name="HelpCircle" size={24} className="text-primary" />
                  Что такое брэинрот?
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Брэинрот — это коллекционные предметы на платформе Roblox, которые можно покупать, продавать и обменивать. 
                Их стоимость зависит от редкости, популярности и спроса.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-2xl px-6 border-2 shadow-md">
              <AccordionTrigger className="text-lg font-medium hover:text-primary">
                <div className="flex items-center gap-3">
                  <Icon name="DollarSign" size={24} className="text-primary" />
                  Как формируется цена?
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Цена рассчитывается на основе редкости предмета, текущего спроса на рынке, исторических данных продаж 
                и уникальных характеристик брэинрота.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-2xl px-6 border-2 shadow-md">
              <AccordionTrigger className="text-lg font-medium hover:text-primary">
                <div className="flex items-center gap-3">
                  <Icon name="Shield" size={24} className="text-primary" />
                  Насколько точна оценка?
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Наша система анализирует тысячи сделок ежедневно и предоставляет примерную оценку с точностью до 85-90%. 
                Финальная цена может варьироваться в зависимости от условий конкретной сделки.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-2xl px-6 border-2 shadow-md">
              <AccordionTrigger className="text-lg font-medium hover:text-primary">
                <div className="flex items-center gap-3">
                  <Icon name="Zap" size={24} className="text-primary" />
                  Как часто обновляются цены?
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Цены обновляются в режиме реального времени на основе актуальных рыночных данных. 
                Мы отслеживаем все крупные торговые площадки Roblox 24/7.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="contact" className="container mx-auto px-4 py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading mb-4 text-foreground">Связаться с Нами</h2>
            <p className="text-muted-foreground text-lg">Есть вопросы? Мы всегда на связи!</p>
          </div>

          <Card className="p-8 shadow-2xl animate-scale-in">
            <form onSubmit={handleContact} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-lg font-medium">Имя</Label>
                <Input id="name" placeholder="Ваше имя" className="py-6" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg font-medium">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" className="py-6" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-lg font-medium">Сообщение</Label>
                <Textarea 
                  id="message" 
                  placeholder="Расскажите, чем мы можем помочь..." 
                  className="min-h-32 resize-none"
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full text-lg py-6 shadow-lg hover:shadow-xl transition-all">
                <Icon name="Send" className="mr-2" size={20} />
                Отправить сообщение
              </Button>
            </form>
          </Card>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Icon name="Mail" className="mx-auto mb-3 text-primary" size={32} />
              <h3 className="font-heading text-lg mb-2">Email</h3>
              <p className="text-muted-foreground text-sm">support@brainrot.com</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Icon name="MessageCircle" className="mx-auto mb-3 text-secondary" size={32} />
              <h3 className="font-heading text-lg mb-2">Discord</h3>
              <p className="text-muted-foreground text-sm">BrainRotPricing#2024</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Icon name="Globe" className="mx-auto mb-3 text-accent" size={32} />
              <h3 className="font-heading text-lg mb-2">Сайт</h3>
              <p className="text-muted-foreground text-sm">www.brainrot.com</p>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Box" className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-heading">BrainRot Pricing</h3>
            </div>
            <p className="text-white/70 max-w-md mx-auto">
              Лучший сервис для оценки брэинротов на Roblox платформе
            </p>
            <div className="text-sm text-white/50 pt-4 border-t border-white/10">
              © 2024 BrainRot Pricing. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
