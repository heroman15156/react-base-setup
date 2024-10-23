import { motion } from "framer-motion";

export default function AnimatedSection() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ amount: 0.2 }} // 옵션 설정
      >
        <h2>Scroll down to reveal</h2>
        <p>This content will slide up and fade in when in view.</p>
      </motion.div>
      <motion.img
        src="https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Animated View"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ amount: 0.2 }}
        style={{ width: "100%", height: "auto", borderRadius: "8px" }} // 이미지 스타일
      />
    </>
  );
}
