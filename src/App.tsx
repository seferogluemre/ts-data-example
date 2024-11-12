import { useState } from "react";

interface appProps {
  pageTitle: string;
}

interface User {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
}

function App({ pageTitle }: appProps) {
  // const [name, setName] = useState("");
  const [user, setUser] = useState<User>();

  // const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.value);
  // };

  // Form Gönderildiginde E parametresini alır
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Gönderdigimiz Formu alıp türünü verdik
    const target = e.target as HTMLFormElement;

    // Formu FormData methodunu kullanarak içindeki degerlerine ulaştık
    const contactFormData = new FormData(target);

    // Verileri alıp objeye dönüştürdükten sonra İlk başta türü sıfırlayıp daha sonrasında User diye belirttik
    const contactFormDataObject = Object.fromEntries(
      contactFormData.entries()
      // Burda Tür never olarak gözükme sıkıntısı vardı Omit Kullanarak User obj içindeki age kaldırıp daha sonrasında tekrar string türünde verdik daha düzgün parça olarak eklemiş olduk
    ) as unknown as Omit<User, "age"> & {
      age: string;
    };

    // userData objesi oluşturup içine objeye dönüştürdügümüz verileri koyduk
    const userData = {
      firstName: contactFormDataObject.firstName,
      lastName: contactFormDataObject.lastName,
      gender: contactFormDataObject.gender,
      age: Number(contactFormDataObject.age),
    };
    // State'i setledik
    setUser(userData);
  }

  return (
    <>
      <h1>{pageTitle}</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="firstName">İsim</label>
          <input type="text" name="firstName" id="firstName" />
        </div>
        <div>
          <label htmlFor="lastName">Soyisim</label>
          <input type="text" name="lastName" id="lastName" />
        </div>
        <div>
          <label htmlFor="age">Yaş</label>
          <input type="number" name="age" id="age" />
        </div>
        <div>
          <label htmlFor="gender">Cinsiyet</label>
          <select name="gender" id="gender">
            <option>Kadın</option>
            <option>Erkek</option>
            <option>Belirtilmed</option>
          </select>
        </div>
        <br />
        <br />
        <button>Gönder</button>
      </form>
      <div>
        <div>İsim{user?.firstName}</div>
        <div>Soyisim{user?.lastName}</div>
        <div>Yaş{user?.age}</div>
        <div>Cinsiyet{user?.gender}</div>
      </div>
    </>
  );
}

export default App;
