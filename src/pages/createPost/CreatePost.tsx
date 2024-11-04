import { useState } from "react";
import ConditionGarment from "./views/conditionCreatePost";
import CategoriesGarment from "./views/categoriesCreatePost";
import GarmentDescription from "./views/descriptionCreatePost";
import ImageUploader from "./views/mediaCreatePost";
import GarmentLocation from "./views/locationCreatePost";
import { CreatePostLayout } from "@/layouts";

// ? STYLES
import "./CreatePost.css";

interface Categories {
  genre: any;
  type: any;
  category: any;
}

interface Description {
  title: string;
  usageTime: string;
  description: string;
  brand: string;
  size: string;
  color: string;
  materials: string[];
  location: {
    city: string;
    country: string;
  };
  tags: string[];
}

interface UploadedFile {
  name: string;
  size: string;
  base64: string;
}

interface PostDetails {
  condition: string;
  categories: Categories;
  description: Description;
  media: UploadedFile[];
}

function CreatePost() {
  const [step, setStep] = useState(1);

  // FORM DATA
  const [postDetails, setPostDetails] = useState<PostDetails>({
    condition: "",
    categories: {
      genre: null,
      type: null,
      category: null,
    },
    description: {
      title: "",
      usageTime: "",
      description: "",
      brand: "",
      size: "",
      color: "",
      materials: [],
      location: {
        city: "",
        country: "",
      },
      tags: [],
    },
    media: [],
  });

  // HANDLERS FOR STEP NAVIGATION
  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <CreatePostLayout
      currentStep={step}
      onNext={handleNext}
      onPrevious={handlePrevious}
      postDetails={postDetails}
      setPostDetails={setPostDetails}
    >
      <div>
        {/* FORM */}
        {step === 1 && (
          <ConditionGarment
            selectedCondition={postDetails?.condition}
            onSelectCondition={(condition: string) =>
              setPostDetails((prevDetails) => ({
                ...prevDetails,
                condition: condition,
              }))
            }
          />
        )}
        {step === 2 && (
          <CategoriesGarment
            selectedCategories={postDetails.categories}
            onSelectCategories={(categories: Categories) =>
              setPostDetails((prevDetails) => ({
                ...prevDetails,
                categories: categories,
              }))
            }
          />
        )}
        {step === 3 && (
          <GarmentDescription
            garmentDescription={postDetails.description}
            onCreateDescription={(description: Description) =>
              setPostDetails((prevDetails: any) => ({
                ...prevDetails,
                description: description,
              }))
            }
          />
        )}
        {step === 4 && (
          <ImageUploader
            garmentMediaUploaded={postDetails.media}
            onUploadedMedia={(media: any) =>
              setPostDetails((prevDetails) => ({
                ...prevDetails,
                media: media,
              }))
            }
          />
        )}
        {step === 5 && (
          <GarmentLocation
            garmentDescription={postDetails?.description}
            onUpdateDescription={(description: Description) =>
              setPostDetails((prevDetails: any) => ({
                ...prevDetails,
                description: description,
              }))
            }
          />
        )}
      </div>
    </CreatePostLayout>
  );
}

export default CreatePost;
