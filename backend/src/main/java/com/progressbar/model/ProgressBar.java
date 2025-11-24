package com.progressbar.model;

import jakarta.persistence.*;

@Entity
@Table(name = "progress_bars")
public class ProgressBar {

    @Id
    private String id;

    private Double percentage;

    public ProgressBar() {}

    public ProgressBar(String id, Double percentage) {
        this.id = id;
        this.percentage = percentage;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Double getPercentage() {
        return percentage;
    }

    public void setPercentage(Double percentage) {
        this.percentage = percentage;
    }
}
