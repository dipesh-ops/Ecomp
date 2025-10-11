import { useEffect, useState } from "react";
import MyContext from "./myContext";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import { toast } from "react-toastify";

function MyState({children}) {
    const [loading, setLoading] = useState(false);

    const [getAllProducts, setGetAllProducts] = useState([]);

    const getAllProductFunction = async () =>{
        setLoading(true);

        try {
            const q = query(
                collection(fireDB, "product"),
                orderBy("time")
            )

            const data = onSnapshot(q, (QuerySnapshot)=>{
            let productsArr = [];
                QuerySnapshot.forEach((doc)=>{
                    productsArr.push({...doc.data(), id : doc.id})
                })
                setGetAllProducts(productsArr);
                setLoading(false)
            })

            return () => data
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // Get Address

    const [addresses, setAddresses] = useState([]);

    const getAddressFunction = async ()=>{
        try {
            const q = query(
                collection(fireDB, 'address')
            )

            const data = onSnapshot(q, (QuerySnapshot)=>{
                const addressArray = [];
                
                QuerySnapshot.forEach((doc)=>{
                    addressArray.push({...doc.data(), id : doc.id})
                })
                setAddresses(addressArray);
            })

            return () => data
            
        } catch (error) {
            console.log(error);
            
        }
    }


    //Get Order Details
    const [myOrder, setMyOrder] = useState([]);

    const getOrderDetailsFunction = async () =>{
        setLoading(true);

        try {
            const q = query(
                collection(fireDB, 'order')
            );
            const data = onSnapshot(q, (QuerySnapshot)=>{
                const orderArray = [];
                QuerySnapshot.forEach((doc)=>{
                    orderArray.push({...doc.data(), id : doc.id})
                })
                setMyOrder(orderArray);
                setLoading(false);
            })

            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // Delete Order

    const deleteOrder = async (id) =>{
        try {
            await deleteDoc(doc(fireDB, 'order', id));
            toast.success("Order deleted successfully");
            getOrderDetailsFunction();
        } catch (error) {
            console.log(error);
        }
    }

    //Get All Users

     const [myUsers, setMyUsers] = useState([]);

     const getAllUsersFuncton = async () =>{
        try {
            const q = query(
                collection(fireDB, 'user'),
                orderBy('time')
            )

            const data = onSnapshot(q, (QuerySnapshot)=>{
                const userArr = [];
                QuerySnapshot.forEach((doc)=>{
                    userArr.push({...doc.data(), id : doc.id});
                })
                setMyUsers(userArr);
            })
            return () => data
        } catch (error) {
            console.log(error);            
        }
     }
    
    useEffect(()=>{
        getAddressFunction();
        getAllProductFunction();
        getOrderDetailsFunction();
        getAllUsersFuncton();
    }, [])
    return(
        <MyContext.Provider value={{
            loading,
            setLoading,
            getAllProducts,
            getAllProductFunction,
            addresses,
            myOrder,
            deleteOrder,
            myUsers
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState;