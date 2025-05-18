"use client";

import React, { useState, useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formServiceSchema } from "@/lib/validation";
import z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createService, updateService } from "@/lib/actions";
import { Combobox, ComboboxDataType } from "./shared/ComboBox";
import { Author, Service } from "@/sanity/types";
import { CloudinaryImage } from "./shared/CloudinaryImage";
import Image from "next/image";

type FormDataType = Omit<Service, "author">;
type ServiceFormType = Omit<Service, "author"> & {
  author?: Author;
};

const local_images: ComboboxDataType[] = [
  {
    _id: "1",
    title: "/exp1.svg",
  },
  {
    _id: "2",
    title: "/exp2.svg",
  },
  {
    _id: "3",
    title: "/exp3.svg",
  },
  {
    _id: "4",
    title: "/exp4.svg",
  },
];

const ServiceForm = ({ post }: { post?: ServiceFormType }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormDataType | null>(null);
  const [selected, setSelected] = useState<ComboboxDataType | null>(null);
  const [initValue, setInitValue] = useState<string>("");
  const [constructions, setConstructions] = useState<ComboboxDataType[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (
    prevState: { error: string; status: string },
    formDataSubmit: FormData
  ) => {
    try {
      const local_image = selected?.title ?? local_images[0].title;

      const formValues = {
        title: formDataSubmit.get("title") as string,
        description: formDataSubmit.get("description") as string,
        image: formDataSubmit.get("image") as string,
        local_image,
      };

      console.log("handleFormSubmit", formValues);
      await formServiceSchema.parseAsync(formValues);

      console.log(formValues);

      const response = post
        ? await updateService(
            prevState,
            formDataSubmit,
            formData!._id!,
            local_image,
          )
        : await createService(prevState, formDataSubmit, local_image);

      if (response.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your project pitch has been created successfully",
        });
      }

      // router.push(`/du-an/${selected?.slug?.current}`)
      router.push(`/admin/dich-vu`);

      return response;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  const handleChangeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData!,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setConstructions(local_images);
  }, []);

  useEffect(() => {
    if (post) {
      const { _id, title, description, local_image, image } = post;

      setFormData({
        ...formData!,
        _id,
        title,
        description,
        local_image,
        image,
      });

      if (local_image) {
        const current_local_image = local_images.find(
          (e) => e.title == local_image
        );
        setInitValue(current_local_image?._id || local_images[0]._id);
      }
    }
  }, [post]);

  return (
    <form action={formAction} className={"startup-form"}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label htmlFor="title" className={"startup-form_label"}>
            {"Tiêu Đề"}
          </label>
          <Input
            id={"title"}
            name={"title"}
            value={formData?.title}
            onChange={handleChangeForm}
            className={"startup-form_input"}
            required
            placeholder={"Nhập tiêu đề"}
          />
          {errors.title && (
            <p className={"startup-form_error"}>{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className={"startup-form_label"}>
            {"Mô Tả"}
          </label>
          <Textarea
            id={"description"}
            name={"description"}
            value={formData?.description}
            className={"startup-form_textarea"}
            required
            placeholder={"Vui lòng nhập mô tả"}
            onChange={handleChangeForm}
          />
          {errors.description && (
            <p className={"startup-form_error"}>{errors.description}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label htmlFor="local_image" className={"startup-form_label"}>
            {"Ảnh Nội Bộ"}
          </label>
          <div>
            <Combobox
              data={constructions}
              initValue={initValue}
              className={"startup-form_input justify-between"}
              onChange={(value: ComboboxDataType) => {
                setSelected(value);
              }}
            />

            {selected?.title && (
              <div className="w-[200px] h-[200px] overflow-hidden mt-2 p-2 border border-black-100">
                <Image
                  src={selected.title}
                  alt={"Ảnh Nội Bộ"}
                  width={128} // Adjust width as needed
                  height={128} // Adjust height as needed
                  className="object-cover w-full rounded-lg"
                />
              </div>
            )}
          </div>
          {errors.local_image && (
            <p className={"startup-form_error"}>{errors.local_image}</p>
          )}
        </div>

        <div>
          <label htmlFor="image" className={"startup-form_label"}>
            {"Ảnh Cloudinary"}
          </label>
          <div>
            <Input
              id={"image"}
              name={"image"}
              value={formData?.image}
              className={"startup-form_input"}
              placeholder={"Đường dẫn ảnh từ Cloudinary"}
              onChange={handleChangeForm}
            />
            {formData?.image && (
              <div className="w-[200px] h-[200px] overflow-hidden mt-2 p-2 border border-black-100">
                <CloudinaryImage
                  src={formData.image}
                  alt={""}
                  width={200}
                  height={200}
                  className="object-cover w-full rounded-lg"
                />
              </div>
            )}
          </div>
          {errors.image && (
            <p className={"startup-form_error"}>{errors.image}</p>
          )}
        </div>
      </div>

      <Button
        type={"submit"}
        className={"startup-form_btn text-white"}
        disabled={isPending}
      >
        {isPending ? "Đang Gửi..." : "Gửi Bài Viết"}
        <Send className={"size-6 ml-2"} />
      </Button>
    </form>
  );
};
export default ServiceForm;
