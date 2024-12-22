"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExpenseSnapshot({
  snapshotLoading,
  setSnapshotLoading,
}) {
  const [snapshot, setSnapshot] = useState<string>("");
  // Gets the snapshot of the summary
  async function getExpenseSnapshot() {
    try {
      const snapshot = await axios.post(
        "/api/v1/ai/ask",
        {
          userhistory: "",
          userquestion:
            "generate a quick summary of my expenses made recently. This should be long enough to let the users what did they spend money on, what was the category they spent money on and also a general overview of some latest purchases. Do not add anything like how can you help further. Just give the summary that's all. Do not mention the name of the items since this is supposed to be short and concise.",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(snapshot.data);
      setSnapshot(snapshot.data.message.message);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      setSnapshot(
        "Not able to generate expense snapshot. Please try again later."
      );
    } finally {
      setSnapshotLoading(false);
    }
  }

  useEffect(() => {
    setSnapshotLoading(true);
    getExpenseSnapshot();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 w-full max-w-4xl mx-auto">
      <div className="relative min-h-[100px]">
        {snapshotLoading ? (
          <div className="flex items-center justify-center h-full">
            <LoadingIndicator />
          </div>
        ) : (
          <AnimatePresence>
            {!snapshotLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-gray-700 leading-relaxed"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="h-1 bg-blue-500 mb-3 sm:mb-4 rounded-full"
                />
                <p className="text-base sm:text-lg md:text-xl font-medium mb-2">
                  {snapshot}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

// Loader
function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center h-30 lg:h-64 absolute left-1/2 -translate-x-1/2 top-1/2 ">
      <div className="h-10 w-10 lg:h-16 lg:w-16 rounded-full drop-shadow-lg animate-spin   border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
