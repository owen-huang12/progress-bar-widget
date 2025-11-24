package com.progressbar.controller;

import com.progressbar.model.ProgressBar;
import com.progressbar.repository.ProgressBarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "*")
public class ProgressBarController {

    @Autowired
    private ProgressBarRepository repository;

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getProgress(@PathVariable String id) {
        ProgressBar progressBar = repository.findById(id)
            .orElse(new ProgressBar(id, 0.0));

        return ResponseEntity.ok(Map.of("percentage", progressBar.getPercentage()));
    }

    @PostMapping("/{id}")
    public ResponseEntity<Map<String, Object>> saveProgress(
            @PathVariable String id,
            @RequestBody Map<String, Object> payload) {

        Object percentageObj = payload.get("percentage");
        Double percentage = 0.0;

        if (percentageObj instanceof Number) {
            percentage = ((Number) percentageObj).doubleValue();
        } else if (percentageObj instanceof String && !((String) percentageObj).isEmpty()) {
            percentage = Double.parseDouble((String) percentageObj);
        }

        ProgressBar progressBar = new ProgressBar(id, percentage);
        repository.save(progressBar);

        return ResponseEntity.ok(Map.of("percentage", percentage));
    }
}
