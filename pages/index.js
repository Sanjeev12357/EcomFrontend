import Featured from "@/components/Featured";
import Header from "@/components/Header";
import Home from "@/components/Home/Home";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({ featuredproduct ,newProducts}) {
  console.log(featuredproduct);
  console.log(newProducts);

  return (
    <div>
     
     <Header />
      <Featured product={featuredproduct} />
      <NewProducts products={newProducts} />
    
    <Home/>
   
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "65b89fedc2acdaf16035a7ca";
  await mongooseConnect();
  const featuredproduct = await Product.findById(featuredProductId);
  const newProducts=await Product.find({},null,{sort:{'_id':-1},limit:10});

  return {
    props: { featuredproduct: JSON.parse(JSON.stringify(featuredproduct)) ,
          newProducts:JSON.parse(JSON.stringify(newProducts))
    },
  };
}
