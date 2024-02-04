"use client";
import { Item } from "@/store";
import classNames from "classnames";
import { useState, MouseEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import dayjs from "dayjs";

export type Inputs = {
  title: string;
  enddate: string;
  description: string;
};

type Props = {
  todo: Item;
  onToggle: () => void;
  onUpdate: (id: string, date: Inputs) => void;
  onDelete: (id: string) => void;
};
const ToDoItem = ({ todo, onToggle, onUpdate, onDelete }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    onUpdate(todo.id, formData);
    setIsOpen(false);
  };

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (todo.status) {
      return;
    }
    setIsOpen(true);
  };

  return (
    <Dialog.Root open={isOpen}>
      <div className="border mb-4 border-secondary rounded-xl py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-3 overflow-hidden items-center">
            <span
              className={classNames(
                "block shrink-0 hover:border-4 duration-300 w-6 h-6 rounded-full cursor-pointer",
                todo.status
                  ? "border-green-600 border-[12px]"
                  : "border-red-500  border-2",
              )}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggle();
              }}
            ></span>
            <h3 className="text-xl font-semibold text-ellipsis overflow-hidden outline-0">
              {todo.title}
            </h3>
          </div>
          <div className="flex items-center gap-1 grow-0">
            <button
              className={classNames(
                "w-8 h-8 p-1.5 rounded hover:bg-secondary-500/20 duration-300",
                todo.status
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer",
              )}
              onClick={handleEdit}
            >
              <svg viewBox="0 0 1061 1024">
                <path
                  d="M877.714 475.429v402.286c0 40.396-32.747 73.143-73.143 73.143H146.285c-40.396 0-73.143-32.747-73.143-73.143V219.429c0-40.396 32.747-73.143 73.143-73.143h438.857V73.143H146.285C65.494 73.143-0.001 138.637-0.001 219.429v658.286c0 80.791 65.494 146.286 146.286 146.286h658.286c80.791 0 146.286-65.494 146.286-146.286V475.429h-73.143z"
                  fill="currentColor"
                  p-id="13891"
                ></path>
                <path
                  d="M397.897 774.217c-5.145 0.812-11.079 1.275-17.121 1.275-27.052 0-51.934-9.295-71.624-24.866-24.26-24.318-23.529-59.427-22.798-117.209 2.851-45.25 21.396-85.691 50.197-116.398L830.903 22.674c40.96-40.96 100.206-20.48 138.24 16.091 10.971 10.971 40.594 40.96 51.566 51.566 36.571 36.571 58.88 96.914 17.189 138.971L543.087 724.113c-30.205 29.593-71.086 48.391-116.341 50.093l-28.848 0.01z m-36.571-75.337c13.39 1.737 28.876 2.729 44.595 2.729 6.955 0 13.864-0.194 20.723-0.577 24.676-1.644 47.559-12.193 64.931-28.534l495.854-494.76c0.004-0.236 0.007-0.514 0.007-0.793 0-14.36-6.517-27.198-16.754-35.717-11.047-10.667-41.401-41.021-52.007-51.992-8.83-10.109-21.744-16.459-36.141-16.459l-0.454 0.002-494.423 494.446a115.687 115.687 0 0 0-28.495 66.486c-0.399 6.509-0.609 13.605-0.609 20.75 0 15.659 1.007 31.082 2.961 46.209z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <button
              className="w-8 h-8 p-1.5 rounded hover:bg-secondary-500/20 duration-300"
              onClick={() => onDelete(todo.id)}
            >
              <svg viewBox="0 0 1024 1024" fill="currentColor">
                <g clipPath="url(#clip0_460_5)">
                  <path
                    d="M981.725 150.312H699.89C680.514 64.3523 603.714 0 512 0C420.286 0 343.369 64.3523 324.11 150.312H42.2752C18.9064 150.312 0 169.218 0 192.587C0 215.956 18.9064 234.862 42.2752 234.862H361.688C385.057 234.862 403.963 215.956 403.963 192.587C403.963 133.05 452.462 84.5505 512 84.5505C571.538 84.5505 620.037 133.05 620.037 192.587C620.037 215.956 638.943 234.862 662.312 234.862H981.725C1005.09 234.862 1024 215.956 1024 192.587C1024 169.218 1005.09 150.312 981.725 150.312ZM887.78 319.413C864.411 319.413 845.505 338.319 845.505 361.688V882.73C845.505 918.899 828.829 938.51 823.78 939.45H200.22C195.171 938.51 178.378 918.899 178.378 882.73V361.688C178.378 338.319 159.472 319.413 136.103 319.413C112.734 319.413 93.8275 338.319 93.8275 361.688V882.73C93.8275 961.996 140.448 1024 200.103 1024H823.78C883.317 1024 930.055 961.996 930.055 882.73V361.688C930.055 338.319 911.149 319.413 887.78 319.413Z"
                    fill="currentColor"
                  />
                  <path
                    d="M399.266 775.046V441.541C399.266 420.756 382.473 403.963 361.688 403.963C340.903 403.963 324.11 420.756 324.11 441.541V775.046C324.11 795.831 340.903 812.624 361.688 812.624C382.473 812.624 399.266 795.831 399.266 775.046ZM699.89 775.046V441.541C699.89 420.756 683.097 403.963 662.312 403.963C641.527 403.963 624.734 420.756 624.734 441.541V775.046C624.734 795.831 641.527 812.624 662.312 812.624C683.097 812.624 699.89 795.831 699.89 775.046Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_460_5">
                    <rect width="1024" height="1024" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
        {todo.description && (
          <div className="text-sm text-secondary-300">{todo.description}</div>
        )}
        {todo.enddate && (
          <div className="text-sm text-secondary-300">
            {dayjs(todo.enddate).format("YYYY-MM-DD")}
          </div>
        )}
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/10 backdrop-blur fixed inset-0" />
        <Dialog.Content
          onEscapeKeyDown={() => setIsOpen(false)}
          className="fixed top-[50%] left-[50%] max-h-[85vh] text-black w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-secondary-500 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
        >
          <Dialog.Title className="text-xl font-medium mb-4">
            Edit task
          </Dialog.Title>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="bg-transparent border-black border rounded-lg grow px-4 py-2">
              <input
                defaultValue={todo.title}
                className="w-full appearance-none bg-transparent outline-0 placeholder:text-black-300"
                placeholder="update your next task here"
                {...register("title", {
                  required: "Your next task can not be empty",
                  minLength: {
                    value: 4,
                    message: "Title must be at least 4 characters.",
                  },
                })}
              />
            </div>
            <div className="bg-transparent border-black border rounded-lg grow px-4 py-2">
              <input
                defaultValue={todo.description}
                className="w-full appearance-none bg-transparent outline-0 placeholder:text-black-300"
                placeholder="update your description here"
                {...register("description", {})}
              />
            </div>
            <div className="bg-transparent border-black border rounded-lg grow px-4 py-2">
              <input
                type="date"
                className="select-none w-full appearance-none bg-transparent outline-0 placeholder:text-black-300"
                placeholder="update your next task here"
                {...register("enddate", {})}
              />
            </div>
            <button
              type="submit"
              className="bg-black text-secondary py-2 w-full rounded-lg"
            >
              Update
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ToDoItem;
