import Ox from "../../assets/ox.svg";
import Cat from "../../assets/cat.svg";
import Dog from "../../assets/dog.svg";
import Penguin from "../../assets/penguine.svg";
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
  variant: "normal" |"fat" | "thin";
  hunger: number;
  stamina: number;
  maxHunger: number;
  maxStamina: number;
  mood: number;
  livingConditions: number;
  filth: number;
  state: "normal"| "malnourished" | "obese"| "exhausted"| "dirty";
  lastFed: number;  
  lastExercised: number;  
  lastCleaned : number;  
  lastUpdated : number;  
  createdAt: number;  
}


const GetAnimal = ({ animal }: { animal: "dog" | "cat" | "penguin" | "ox" }) => {
  const commonClass = "aspect-square max-h-full";
  if (animal === "penguin") return <img className={commonClass} src={Penguin} alt="Penguine" />;
  if (animal === "cat") return <img className={commonClass} src={Cat} alt="Cat" />;
  if (animal === "ox") return <img className={`${commonClass} rotate-y-180`} src={Ox} alt="Ox" />;
  if (animal === "dog") return <img className={commonClass} src={Dog} alt="Dog" />;
  return null;
};

const Progressbar = ({
  currentItem,
  MaxItem,
  classNameOuter,
  classNameInner,
}: {
  currentItem: number;
  MaxItem: number;
  classNameOuter: string;
  classNameInner: string;
}) => {
  const roundFraction = Math.round((currentItem / MaxItem) * 100);
  return (
    <div className={`${classNameOuter} w-full h-2 rounded-full`}>
      <div
        className={`${classNameInner} h-full rounded-full`}
        style={{ width: `${roundFraction}%` }}
      ></div>
    </div>
  );
};

const Gameplay = ({taro}:{taro:TaroProp}) => {
  const { user } = useAuthStore();
  const [pet,setPet] = useState<TaroProp>();

  useEffect(()=>{
    setPet(taro);
  },[]);
  
  if (!pet) {
    return <div>Loading</div>
  }

  // Dynamic pet dialog message
  let dialogMessage = "I'm doing great! 😊";

     if (pet.state === "obese") {
      dialogMessage = "I am feeling a bit overweight";
     } else if (pet.state === "malnourished") {
      dialogMessage = "I need Something to eat"
     } else if (pet.state === "exhausted") {
      dialogMessage = "I am too much tired";
     } else if (pet.state === "dirty") {
      dialogMessage = "I'm filthy";
     } else {
      dialogMessage = "I'm doing great! 😊";
     }

  return (
    <div className="bg-UI-5 h-full flex justify-center items-center">
      <div className="w-full h-full md:w-3/4 p-2 bg-Accent-Primary flex flex-col gap-2 ">
        {/* Game Top Section */}
        <div className="bg-BG-Secondary h-3/4 flex flex-col justify-between rounded-xl p-4 relative">
          {/* Currency Panel */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
            <div className="w-16 h-16 bg-Accent-Primary flex items-center justify-center text-xl text-Text-Ligth opacity-25 hover:opacity-100 rounded-xl">
              💵 {user?.taroDollar}
            </div>
            <div className="w-16 h-16 bg-Accent-Primary flex items-center justify-center text-xl text-Text-Ligth opacity-25 hover:opacity-100 rounded-xl">
              🍔 {user?.food}
            </div>
          </div>

          {/* Pet Name */}
          <div className="text-2xl text-Text-Ligth font-bold mb-4">{pet.name}</div>

          {/* Game Area */}
          <div className="flex h-72">
            {/* Pet Display */}
            <div className="h-full bg-Accent-Secondary flex justify-center flex-1 rounded-lg relative">
              <div className="relative h-full">
                <GetAnimal animal={pet.type} />

                {/* Dialog box */}
                {pet.state !== "normal" && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0 z-40 bg-BG-Primary text-Text-Dark px-4 py-2 text-center rounded-xl shadow-md w-[90vw] max-w-xs text-sm">
                  <p>{dialogMessage}</p>
                  <div className="w-3 h-3 bg-BG-Primary rotate-45 absolute left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 -bottom-1"></div>
                </div>
              )}

              </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex items-end justify-center">
              <div className="w-11/12 h-[45%] bg-BG-Dark rounded-lg flex flex-col text-white py-2">
                <div className="text-center w-full">Stats</div>
                <div className="flex items-center px-2 gap-2">
                  🍔
                  <Progressbar
                    currentItem={pet.hunger}
                    MaxItem={pet.maxHunger}
                    classNameOuter="bg-Accent-Primary"
                    classNameInner="bg-UI-4"
                  />
                </div>
                <div className="flex items-center px-2 gap-2">
                  ⚽
                  <Progressbar
                    currentItem={pet.stamina}
                    MaxItem={pet.maxStamina}
                    classNameOuter="bg-Accent-Primary"
                    classNameInner="bg-UI-8"
                  />
                </div>
                <div className="flex items-center px-2 gap-2">
                  🚿
                  <Progressbar
                    currentItem={255 - pet.filth}
                    MaxItem={255}
                    classNameOuter="bg-Accent-Primary"
                    classNameInner="bg-UI-10"
                  />
                </div>
                <div className="flex items-center px-2 gap-2">
                  😸
                  <Progressbar
                    currentItem={pet.mood}
                    MaxItem={100}
                    classNameOuter="bg-Accent-Primary"
                    classNameInner="bg-UI-9"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="grow grid grid-cols-2 gap-2 text-3xl bg-UI-7 p-1 rounded-xl text-center text-white">
          <div
            className="bg-UI-4 w-full h-full rounded-tl-xl hover:bg-BG-Primary flex items-center justify-center cursor-pointer"
            onClick={() => toast("feed")}
          >
            Feed 🍴
          </div>
          <div className="bg-UI-8 w-full h-full rounded-tr-xl hover:bg-BG-Primary flex items-center justify-center cursor-pointer">
            Play ⚽
          </div>
          <div className="bg-UI-10 w-full h-full rounded-bl-xl hover:bg-BG-Primary flex items-center justify-center cursor-pointer">
            Clean 🚿
          </div>
          <div className="bg-UI-9 w-full h-full rounded-br-xl hover:bg-BG-Primary flex items-center justify-center cursor-pointer">
            Sleep 😴
          </div>
        </div>
      </div>
    </div>
  );
};

const Game = () => {

  const [taro,setTaro] = useState<TaroProp>();
  const [isModal,setIsModal] = useState(false);
  const [type,setType] = useState<"dog" | "cat" | "penguin" | "ox">();
  const [variant,setVariant] = useState<"normal" |"fat" | "thin">();
  const [name,setName] = useState("");

  const getPet = async () =>{
    const response = await api("/pet/my");
    setTaro(response.data.pet)
    console.log(response.data.data,response.data.pet);
  }

  const openModal = () =>{
    const rand =() => Math.round(Math.random() * 100);
    let randVal = rand();
    if (  randVal < 40 ) {
      setType("cat");
    } else if ( randVal < 80) {
      setType("dog");
    } else if (randVal < 95) {
      setType("ox")
    } else {
      setType("penguin");
    }

    randVal = rand();

    if (  randVal < 80 ) {
      setVariant("normal");
    } else if ( randVal < 90) {
      setVariant("thin")
    } else {
      setVariant("fat")
    }

    setIsModal(true);
  }

  const createNewPet = async ()=>{
    if(name === "" ) {
      toast.error("Please Enter Name");
      return ;
    }
    const data = {
      name, type, variant
    };

    try {
      const response = await api.post("/pet/",data);
      if(response.status === 201){
        setTimeout(() => {
          toast.success(response.data.message);
        }, 2000);  
        window.location.reload();
      }
      
    } catch (error) {
      console.error("Something went wrong when Catching the Taro",error);
      toast.error("Something went wrong when Catching the Taro")
    }

    setIsModal(false);
  }

  useEffect(()=>{
    getPet();
  },[]);


  return taro ? <Gameplay taro={taro} />:(
    <div className="w-full h-full bg-UI-6 flex justify-center items-center flex-col gap-2">
      <div className="text-4xl">No Taro Found</div>
      <div className="bg-Accent-Primary p-1 text-Text-Ligth" onClick={openModal} >Let's Search a new Taro...</div>
      {isModal && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/85 text-Text-Dark backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-BG-Secondary p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-black"
              onClick={() => setIsModal(false)}
            >
              <X />
            </button>
            <h2 className="text-2xl mb-4">Searching New Taro</h2>
            {type && (
              <GetAnimal animal={type} />
            )}
            {type && variant && (
              <div className="flex flex-col justify-center items-center">
                <div className="">Hey, You found a new Taro... </div>
                <div className="">It is a(n) {type}, It looks {variant}</div>
                <div className="">What should we name it?</div>
                <input type="text" value={name}
                 onChange={(e)=>(setName(e.target.value))} 
                 className="border border-BG-Dark bg-BG-Primary rounded-full text-xl text-Text-Dark px-2" placeholder="Enter Name"/>
              </div>
            )}
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setIsModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={createNewPet}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}    </div>
  );
};

export default Game;
