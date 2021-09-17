import db from '../../firebase';
import {useState, useEffect} from 'react'
import './css/Plans.css'
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/counter/userSlice';
import {loadStripe} from '@stripe/stripe-js'
import { LoopCircleLoading } from 'react-loadingg';


function Plans() {
    const user = useSelector(selectUser)
    const [products,setProducts] = useState([])
    const [plan, setPlan] = useState(null)
    const [loading, setLoading] = useState(false);


    useEffect(()=>{
        db.collection('customers').doc(user.uid).collection('subscriptions').where('status','!=','canceled').get().then(snap=>{
            snap.forEach(async sub=>{
                setPlan({
                    role: sub.data().role,
                    current_period_end: sub.data().current_period_end.seconds,
                    current_period_start: sub.data().current_period_start.seconds,

                })
            })
        })
    },[user.uid]);
    useEffect(()=>{
        db.collection('products').where('active','==',true)
        .get().then(querySnapshot=>{
            const tempProducts = {};
            querySnapshot.forEach(async(productDoc)=>{
              tempProducts[productDoc.id] = productDoc.data();
              const priceSnap=await productDoc.ref.collection('prices').get();
              priceSnap.docs.forEach(doc => {
                  tempProducts[productDoc.id].prices = {
                      priceId: doc.id,
                      priceData: doc.data()
                  }
              })  
            })
            setProducts(tempProducts)
        })
    },[]);
    const loadCheckout = async (priceID)=>{
        setLoading(true)
        const docRef = await db.collection('customers').doc(user.uid).collection("checkout_sessions").add({
            price: priceID,
            success_url: window.location.origin,
            cancel_url: window.location.origin
        })
        docRef.onSnapshot(async(snap)=>{
            const {error, sessionId} = snap.data();

            if(error){
                alert(`An error occured: ${error.message}`)
            }

            if(sessionId){
                const stripe = await loadStripe('pk_test_51IwWptE1UBGD1U5MHKJa8uDpRQX116sGNdwq3g70NWeLqDoR9Lzq9Vdb27gYHgu0DM3mg8xVgzx5byJ4RDzJaaj600LL8x2XbY');
                stripe.redirectToCheckout({sessionId});
            }
        })
    }

    return (
        <div className="plans">
            {loading && <div className="loading"><LoopCircleLoading/></div>}
            {plan && <p className="plans__renewal">Next Payment: {new Date(plan.current_period_end*1000).toLocaleDateString()}</p>}
            {Object.entries(products).map(([id,data])=>{
                // TODO: Logic to check user's plan
                const isCurrentPlan=data.name?.toLowerCase().includes(plan?.role);
                return(
                    <div key={id} className='plans__plan'>
                        <div className="plans__info">
                            <h5>{data.name}</h5>
                            <h6>{data.description}</h6>
                        </div>
                        <Button variant="contained" color="primary" className={!isCurrentPlan? 'plans__button' : 'plans__current'}
                        onClick={()=>!isCurrentPlan && loadCheckout(data.prices.priceId)}
                        disabled={isCurrentPlan}
                        >
                            <p>{isCurrentPlan?'Current Plan':'Select Plan'}</p>
                        </Button>
                    </div>
                )
            })}
        </div>
    )
}

export default Plans
