
const s = "ADOBECODEBANC";
const t = "ABC";

const minWindow = function (s, t) {
    if (!s || !t || s.length < t.length) return "";

    
    const targetMap = new Map();
    for (const char of t) {
        targetMap.set(char, (targetMap.get(char) || 0) + 1);
    }

    
    const windowMap = new Map();
    let left = 0;
    let right = 0;
    let minLength = Infinity;
    let minWindow = "";

    let have = 0;
    const need = targetMap.size;

    
    while (right < s.length) {
        const charRight = s[right];
        windowMap.set(charRight, (windowMap.get(charRight) || 0) + 1);

        if (targetMap.has(charRight) && windowMap.get(charRight) === targetMap.get(charRight)) {
            have++;
        }

       
        while (have === need) {
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                minWindow = s.slice(left, right + 1);
            }

            const charLeft = s[left];
            windowMap.set(charLeft, windowMap.get(charLeft) - 1);

            if (targetMap.has(charLeft) && windowMap.get(charLeft) < targetMap.get(charLeft)) {
                have--;
            }

            left++;
        }

        right++;
    }

    return minWindow;
};

console.log(minWindow(s, t)); 