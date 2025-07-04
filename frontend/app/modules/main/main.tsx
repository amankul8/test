import {BaseBtn} from "~/shared/ui";
import type { Route } from "./+types/main";
import RequireAuth from "../auth/hooks/require_auth";
import { useAuth } from "../auth/hooks/auth";
import { toast } from "react-toastify";
import Content from "~/shared/layout_components/content";
import Card from "~/shared/components/card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Main" },
    { name: "description", content: "Welcome to Main page!" },
  ];
}

const cards = [
  {
    id: 1,
    title: '2Captcha solver', 
    text: 'Extension for the Google Chrome browser that automatically recognizes captchas such as ReCaptcha V2, V3, GeeTest, Arkose Labs FunCaptcha, Human Captcha and others.', 
    logo: '/images/logos/lock.svg', 
    rating: 4.6, 
    isLock: true, 
    reviews: 460,
    price: null
  },
   {
    id: 2,
    title: 'Puppeteer plugin to solve reCAPTCHAs automatically', 
    text: 'Extension for the Google Chrome browser that automatically recognizes captchas such as ReCaptcha V2, V3, GeeTest, Arkose Labs FunCaptcha, Human Captcha and others.', 
    logo: '/images/logos/box.svg', 
    rating: 4.6, 
    isLock: false, 
    reviews: 460,
    price: 67
  }, {
    id: 3,
    title: '2captcha-javascript', 
    text: 'Extension for the Google Chrome browser that automatically recognizes captchas such as ReCaptcha V2, V3, GeeTest, Arkose Labs FunCaptcha, Human Captcha and others.', 
    logo: '/images/logos/js.svg', 
    rating: 4.6, 
    isLock: true, 
    reviews: 460,
    price: 67
  }
]

function Main() {

  return (    
    <section className="w-full  min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <Content>
        <div className="flex flex-col w-full items-center bg-white gap-5 rounded-[10px] p-5">
          {
            cards.map(item => 
              <Card
                key={item.id}
                title={item.title}
                text={item.text}
                logo={item.logo}
                rating={item.rating}
                isLock={item.isLock}
                price={item.price}
                reviews={item.reviews}
              />
            )
          }
        </div>
      </Content>
    </section>
  )
}

function MainPage() {
  return (
    <RequireAuth>
      <Main />
    </RequireAuth>
  );
}

export default MainPage;