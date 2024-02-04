"use client";
import ToDoItem from "@/components/ToDoItem";
import { Item, useToDoState } from "@/store";
import { useCallback, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Inputs as EditInputs } from "./ToDoItem";

const ToDoList = () => {
  const supabase = createClientComponentClient();
  const todos = useToDoState((state) => state.list);
  const empty = useToDoState((state) => state.empty);
  const setTodos = useToDoState((state) => state.setList);
  const toggleItem = useToDoState((state) => state.toggleItem);
  const updateItem = useToDoState((state) => state.updateItem);
  const loading = useToDoState((state) => state.loading);
  const setLoading = useToDoState((state) => state.setLoading);

  useEffect(() => {
    setLoading(true);

    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("id", { ascending: true });
      const todos = data || [];
      if (error) console.log("error", error);
      else setTodos(todos);

      setLoading(false);
    };

    fetchTodos();
  }, [supabase]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await supabase.from("todos").delete().eq("id", id).throwOnError();
        const latestTodos = todos.filter((item) => item.id != id);
        setTodos(latestTodos);
      } catch (error) {
        console.log("error", error);
      }
    },
    [todos],
  );

  const handleToggle = async (todo: Item) => {
    try {
      const { data } = await supabase
        .from("todos")
        .update({ status: !todo.status })
        .eq("id", todo.id)
        .throwOnError()
        .select()
        .single();

      if (data) {
        toggleItem(todo);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleUpdate = async (id: string, formData: EditInputs) => {
    const result = Object.entries(formData).reduce((prev, [key, value]) => {
      if (value) {
        // @ts-ignore
        prev[key] = value;
      }
      return prev;
    }, {});

    const { error, data } = await supabase
      .from("todos")
      .update(result)
      .eq("id", id)
      .select()
      .single();

    if (!error) {
      updateItem(id, data);
    }
  };

  if (loading) {
    return <div className="text-center my-20 text-black-300">Loading...</div>;
  }

  if (empty) {
    return (
      <div className="text-center my-20 text-black-300">
        All tasks completed
      </div>
    );
  }

  return todos?.map((item) => (
    <ToDoItem
      key={item.id}
      onUpdate={handleUpdate}
      onToggle={() => handleToggle(item)}
      onDelete={handleDelete}
      todo={item}
    />
  ));
};

export default ToDoList;
