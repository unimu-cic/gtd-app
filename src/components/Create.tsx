"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Item, useToDoState } from "@/store";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { FC } from "react";

type Inputs = {
  title: string;
};

type Props = {
  session: Session;
};

const Create: FC<Props> = ({ session }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const addToDo = useToDoState((state) => state.addItem);

  const onSubmit: SubmitHandler<Inputs> = async ({ title }) => {
    const supabase = createClientComponentClient();

    const item = {
      user_id: session.user.id,
      title,
      description: "",
      enddate: null,
      startdate: new Date(),
      priority: null,
      status: false,
    } as Item;

    const { error, data } = await supabase
      .from("todos")
      .insert(item)
      .select()
      .single();

    if (!error) {
      addToDo(data);
      reset();
    }
  };

  return (
    <div className="my-10">
      <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-black-500 rounded-lg grow px-4 py-2 focus-within:border-primary border border-transparent">
          <input
            className="w-full appearance-none bg-transparent outline-0 placeholder:text-secondary/50 appearance-none"
            placeholder="create your next task..."
            {...register("title", {
              required: "Your next task can not be empty",
              minLength: {
                value: 4,
                message: "title must be at least 4 characters.",
              },
            })}
          />
        </div>
        <button
          className="w-10 h-10 bg-primary flex justify-center items-center rounded-full text-black hover:rotate-90 duration-300"
          type="submit"
        >
          <svg className="w-5 h-5" viewBox="0 0 1024 1024">
            <path
              d="M640 469.333333h170.666667a42.666667 42.666667 0 0 1 0 85.333334h-170.666667a42.666667 42.666667 0 0 1 0-85.333334z m-85.333333 341.333334a42.666667 42.666667 0 0 1-85.333334 0v-256H213.333333a42.666667 42.666667 0 0 1 0-85.333334h256V213.333333a42.666667 42.666667 0 0 1 85.333334 0v597.333334z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </form>
      {errors.title && (
        <p className='text-xs mt-2 opacity-70 before:content-["*"] before:text-primary'>
          {errors.title.message}
        </p>
      )}
    </div>
  );
};

export default Create;
