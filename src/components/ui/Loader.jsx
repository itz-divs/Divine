import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'var(--color-lightest)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'var(--color-accent)',
              borderRadius: '20px',
              position: 'relative',
              boxShadow: 'var(--shadow-hover)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Medical Cross */}
            <div style={{ position: 'absolute', width: '20px', height: '50px', backgroundColor: '#fff', borderRadius: '4px' }}></div>
            <div style={{ position: 'absolute', width: '50px', height: '20px', backgroundColor: '#fff', borderRadius: '4px' }}></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
