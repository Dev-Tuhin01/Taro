import Ox from "../../assets/ox.svg";
import Cat from "../../assets/cat.svg";
import Dog from "../../assets/dog.svg";
import Penguin from "../../assets/penguine.svg";
import Garden from "../../assets/garden.svg";
import toast from "react-hot-toast";
import { useAuthStore } from "../../Stores/AuthStore";
import api from "../../API/axiosAPI";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface TaroProp {
  _id: string;
  _v: number;
  ownerId?: string;
  name: string;
  type: "dog" | "cat" | "penguin" | "ox";
  variant: "normal" | "fat" | "thin";
  hunger: number;
  stamina: number;
  maxHunger: number;
  maxStamina: number;
  mood: number;
  livingConditions: number;
  filth: number;
  state: "normal" | "malnourished" | "obese" | "exhausted" | "dirty";
  lastFed: number;
  lastExercised: number;
  lastCleaned: number;
  lastUpdated: number;
  createdAt: number;
}

const GetAnimal = ({ animal }: { animal: TaroProp["type"] }) => {
  const commonClass = "aspect-square max-h-full";
  switch (animal) {
    case "penguin": return <img className={commonClass} src={Penguin} alt="Penguin" />;
    case "cat": return <img className={commonClass} src={Cat} alt="Cat" />;
    case "ox": return <img className={`${commonClass} rotate-y-180`} src={Ox} alt="Ox" />;
    case "dog": return <img className={commonClass} src={Dog} alt="Dog" />;
    default: return null;
  }
};

const Progressbar = ({ currentItem, MaxItem, classNameOuter, classNameInner }: {
  currentItem: number;
  MaxItem: number;
  classNameOuter: string;
  classNameInner: string;
}) => {
  const percent = Math.round((currentItem / MaxItem) * 100);
  return (
    <div className={`${classNameOuter} w-full h-2 rounded-full`}>
      <div className={`${classNameInner} h-full rounded-full`} style={{ width: `${percent}%` }}></div>
    </div>
  );
};

const BuyFoodModal = ({ onClose }: { onClose: () => void }) => {
  const { user, updateUserLocally } = useAuthStore();
  const [amount, setAmount] = useState(1);

  const handleSubmit = async () => {
    try {
      const response = await api.post("/misc/buy/food/", { unitOfFood: amount });
      if (response.status === 200) {
        toast.success(`Bought ${amount} food!`);
        updateUserLocally({ taroDollar: response.data.taroDollar, food: response.data.food });
        onClose();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Purchase failed");
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-50">
      <div className="bg-BG-Primary p-6 rounded-lg shadow-xl relative w-[320px]">
        <button className="absolute top-2 right-2 text-black" onClick={onClose}><X /></button>
        <h2 className="text-xl font-bold mb-4">Buy Food 🍔</h2>
        <input
          type="range"
          min={1}
          max={50}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full accent-UI-7 mb-2"
        />
        <p className="text-center mb-4">Amount: {amount}</p>
        <div className="flex justify-between">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-UI-7 px-4 py-2 rounded text-white" onClick={handleSubmit}>Buy</button>
        </div>
      </div>
    </div>
  );
};

const Gameplay = ({ taro }: { taro: TaroProp }) => {
  const { user, updateUserLocally } = useAuthStore();
  const [pet, setPet] = useState(taro);
  const [showBuyFood, setShowBuyFood] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [interactionMessage, setInteractionMessage] = useState("");

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleInteraction = async (type: "feed" | "exercise" | "clean" | "sleep", duration: number, message: string) => {
    if (isInteracting) return;
    setIsInteracting(true);
    setInteractionMessage(message);
    await delay(duration);

    try {
      let res;
      switch (type) {
        case "feed":
          res = await api.post(`/pet/${pet._id}/feed`, { food: 1 });
          setPet(res.data.pet);
          updateUserLocally({ food: res.data.food });
          break;
        case "exercise":
          res = await api.post(`/pet/${pet._id}/exercise`);
          setPet(res.data.pet);
          updateUserLocally({ taroDollar: res.data.taroDollar });
          break;
        case "clean":
          res = await api.post(`/pet/${pet._id}/clean`);
          setPet(res.data);
          break;
        case "sleep":
          res = await api.post(`/pet/${pet._id}/sleep`);
          setPet(res.data);
          break;
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Interaction failed");
    }

    setInteractionMessage("");
    setIsInteracting(false);
  };

  const message = interactionMessage || (
    pet.hunger < 25 ? "I need food 😟" :
    pet.stamina < 20 ? "I'm tired 💤" :
    pet.livingConditions < 30 ? "I'm dirty 🧼" :
    "I'm feeling great! 😊"
  );

  return (
    <div className="h-full flex justify-center items-center bg-UI-5">
      <div className="w-full h-full md:w-3/4 p-2 bg-Accent-Primary flex flex-col gap-2 relative">
        <div className="bg-BG-Secondary h-3/4 flex flex-col justify-between rounded-xl p-4 relative" style={{ backgroundImage: `url(${Garden})`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
            <div className="w-16 h-16 bg-Accent-Primary flex items-center justify-center text-lg text-Text-Ligth rounded-xl">💵 {user?.taroDollar ?? 0}</div>
            <div className={`w-16 h-16 bg-Accent-Primary flex items-center justify-center text-lg text-Text-Ligth rounded-xl cursor-pointer ${isInteracting ? "opacity-50 pointer-events-none" : ""}`} onClick={() => setShowBuyFood(true)}>🍔 {user?.food ?? 0}</div>
          </div>
          <div className="text-2xl text-white bg-Accent-Primary w-fit py-1 px-2 rounded-2xl font-bold mb-4">{pet.name}</div>
          <div className="flex h-72">
            <div className="h-full bg-Accent-Secondary/80 flex justify-center flex-1 rounded-lg relative">
              <GetAnimal animal={pet.type} />
              <div className="absolute -top-2 md:-right-8 -right-12 bg-white text-black md:text-sm text-xs w-fit p-2 rounded-xl shadow-xl md:w-36 text-center z-10">{message}</div>
            </div>
            <div className="flex-1 flex items-end justify-center">
              <div className="w-11/12 h-[45%] bg-BG-Dark/90 rounded-lg flex flex-col text-white py-2">
                <div className="text-center">Stats</div>
                <div className="flex items-center px-2 gap-2">🍔 <Progressbar currentItem={pet.hunger} MaxItem={pet.maxHunger} classNameOuter="bg-Accent-Primary" classNameInner="bg-UI-4" /></div>
                <div className="flex items-center px-2 gap-2">💪 <Progressbar currentItem={pet.stamina} MaxItem={pet.maxStamina} classNameOuter="bg-Accent-Primary" classNameInner="bg-UI-8" /></div>
                <div className="flex items-center px-2 gap-2">🚿 <Progressbar currentItem={pet.livingConditions} MaxItem={255} classNameOuter="bg-Accent-Primary" classNameInner="bg-UI-10" /></div>
                <div className="flex items-center px-2 gap-2">😸 <Progressbar currentItem={pet.mood} MaxItem={100} classNameOuter="bg-Accent-Primary" classNameInner="bg-UI-9" /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 grow gap-2 text-3xl bg-UI-7 p-1 rounded-xl text-center text-white">
          <div className={`bg-UI-4 rounded-tl-xl flex justify-center items-center cursor-pointer ${isInteracting ? "opacity-50 pointer-events-none" : "hover:bg-BG-Primary"}`} onClick={() => handleInteraction("feed", 2000, "Feeding... 🍴")}>Feed 🍴</div>
          <div className={`bg-UI-8 rounded-tr-xl flex justify-center items-center cursor-pointer ${isInteracting ? "opacity-50 pointer-events-none" : "hover:bg-BG-Primary"}`} onClick={() => handleInteraction("exercise", 10000, "Playing... ⚽")}>Play ⚽</div>
          <div className={`bg-UI-10 rounded-bl-xl flex justify-center items-center cursor-pointer ${isInteracting ? "opacity-50 pointer-events-none" : "hover:bg-BG-Primary"}`} onClick={() => handleInteraction("clean", 5000, "Cleaning... 🧼")}>Clean 🚿</div>
          <div className={`bg-UI-9 rounded-br-xl flex justify-center items-center cursor-pointer ${isInteracting ? "opacity-50 pointer-events-none" : "hover:bg-BG-Primary"}`} onClick={() => handleInteraction("sleep", 20000, "Sleeping... 😴")}>Sleep 😴</div>
        </div>
      </div>
      {showBuyFood && <BuyFoodModal onClose={() => setShowBuyFood(false)} />}
    </div>
  );
};

const Game = () => {
  const [taro, setTaro] = useState<TaroProp | null>(null);
  const [isModal, setIsModal] = useState(false);
  const [type, setType] = useState<TaroProp["type"]>();
  const [variant, setVariant] = useState<TaroProp["variant"]>();
  const [name, setName] = useState("");

  const getPet = async () => {
    try {
      const res = await api.get("/pet/my");
      if (res.data.data) setTaro(res.data.pet);
    } catch {
      toast.error("Failed to fetch your Taro");
    }
  };

  const openModal = () => {
    const r = () => Math.floor(Math.random() * 100);
    const r1 = r();
    setType(r1 < 40 ? "cat" : r1 < 80 ? "dog" : r1 < 95 ? "ox" : "penguin");
    const r2 = r();
    setVariant(r2 < 80 ? "normal" : r2 < 90 ? "thin" : "fat");
    setIsModal(true);
  };

  const createNewPet = async () => {
    if (!name) return toast.error("Please enter a name");
    try {
      const res = await api.post("/pet/", { name, type, variant });
      if (res.status === 201) {
        toast.success("New Taro Created!");
        getPet();
      }
    } catch {
      toast.error("Something went wrong while catching Taro");
    }
    setIsModal(false);
  };

  useEffect(() => {
    getPet();
  }, []);

  return taro ? (
    <Gameplay taro={taro} />
  ) : (
    <div className="w-full h-full bg-UI-6 flex justify-center items-center flex-col gap-2">
      <div className="text-4xl">No Taro Found</div>
      <div className="bg-Accent-Primary p-1 text-Text-Ligth cursor-pointer" onClick={openModal}>Let's Search a new Taro...</div>
      {isModal && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/80 text-Text-Dark backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-BG-Secondary p-6 rounded-lg shadow-lg w-96 relative">
            <button className="absolute top-2 right-2 text-black" onClick={() => setIsModal(false)}><X /></button>
            <h2 className="text-2xl mb-4">Searching New Taro</h2>
            {type && <GetAnimal animal={type} />}
            {type && variant && (
              <div className="flex flex-col justify-center items-center">
                <div>It is a(n) {type}, it looks {variant}</div>
                <div>What should we name it?</div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border bg-BG-Primary rounded-full text-xl px-2" placeholder="Enter Name" />
              </div>
            )}
            <div className="flex justify-end gap-4 mt-6">
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setIsModal(false)}>Cancel</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={createNewPet}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
